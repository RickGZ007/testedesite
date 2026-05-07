import { useState, useEffect, useRef } from "react";
import { Save, X, ImageIcon, Upload, Loader2, Link } from "lucide-react";
import { CATEGORIAS, NOMES_MATERIAIS } from "../data/mockData";
import { uploadImagem } from "../services/api";
import { resolveImageUrl } from "../services/imageUtils";

const EMPTY_FORM = {
  titulo: "", imagem: "",
  categoria: CATEGORIAS[0], material: NOMES_MATERIAIS[0], finalidade: "",
};

export default function ProjectForm({ projeto, onSave, onCancel }) {
  const [form, setForm]               = useState(EMPTY_FORM);
  const [errors, setErrors]           = useState({});
  const [previewUrl, setPreview]      = useState("");
  const [uploading, setUploading]     = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef                  = useRef(null);

  useEffect(() => {
    if (projeto) {
      setForm({
        titulo: projeto.titulo||"", imagem: projeto.imagem||"",
        categoria: projeto.categoria||CATEGORIAS[0],
        material: projeto.material||NOMES_MATERIAIS[0],
        finalidade: projeto.finalidade||"",
      });
      // Resolve o link do Drive na hora de pré-visualizar
      setPreview(resolveImageUrl(projeto.imagem || ""));
    } else {
      setForm(EMPTY_FORM);
      setPreview("");
    }
    setErrors({}); setUploadError("");
  }, [projeto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    // Converte o link do Drive imediatamente no preview
    if (name === "imagem") setPreview(resolveImageUrl(value));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg","image/png","image/webp","image/gif"].includes(file.type)) {
      setUploadError("Use JPG, PNG, WEBP ou GIF."); return;
    }
    if (file.size > 10*1024*1024) { setUploadError("Máximo 10 MB."); return; }
    setPreview(URL.createObjectURL(file));
    setUploadError(""); setUploading(true);
    try {
      const data = await uploadImagem(file);
      setForm((p) => ({ ...p, imagem: data.url }));
      setPreview(data.url);
    } catch (err) {
      setUploadError(`Falha no upload: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.titulo.trim())     errs.titulo     = "Título é obrigatório.";
    if (!form.finalidade.trim()) errs.finalidade = "Finalidade é obrigatória.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (uploading) return;
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onSave({
      ...form,
      // Salva a URL original no banco (não a convertida)
      imagem: form.imagem.trim() ||
        `https://placehold.co/600x400/111827/f97316?text=${encodeURIComponent(form.titulo)}`,
      id: projeto?.id ?? undefined,
    });
  };

  const isDriveLink = form.imagem.includes("drive.google.com");

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>

      {/* Título */}
      <div>
        <label className="form-label">Título do projeto *</label>
        <input type="text" name="titulo" value={form.titulo} onChange={handleChange}
          placeholder="Ex: Suporte industrial modular" className="form-input" />
        {errors.titulo && <p className="text-xs text-error mt-1">{errors.titulo}</p>}
      </div>

      {/* Upload */}
      <div>
        <label className="form-label"><ImageIcon className="inline w-3.5 h-3.5 mr-1" />Imagem do projeto</label>

        {/* Zona de upload por arquivo */}
        <div onClick={() => fileInputRef.current?.click()}
          className="relative flex flex-col items-center justify-center gap-2 border-2 border-dashed border-input-border hover:border-accent/50 rounded-xl p-6 cursor-pointer transition-colors bg-input-bg group min-h-[120px]">
          {uploading
            ? <><Loader2 className="w-8 h-8 text-accent animate-spin" /><p className="text-xs text-secondary">Enviando...</p></>
            : previewUrl
              ? <img src={previewUrl} alt="preview" referrerPolicy="no-referrer"
                  className="w-full max-h-40 object-cover rounded-lg"
                  onError={(e) => { e.target.style.display="none"; }} />
              : <><Upload className="w-8 h-8 text-muted group-hover:text-accent transition-colors" />
                <p className="text-xs text-muted text-center">Clique para selecionar<br/>
                  <span className="text-muted/60">JPG, PNG, WEBP · max 10 MB</span></p></>
          }
          <input ref={fileInputRef} type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileChange} className="hidden" />
        </div>

        {uploadError && <p className="text-xs text-error mt-1">{uploadError}</p>}

        {/* Separador */}
        <div className="flex items-center gap-2 my-2">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[10px] text-muted uppercase tracking-wide">ou cole uma URL / link do Drive</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Campo de URL */}
        <input type="text" name="imagem" value={form.imagem} onChange={handleChange}
          placeholder="https://drive.google.com/file/d/... ou https://..."
          className="form-input" />

        {/* Badge indicando que é um link do Drive */}
        {isDriveLink && (
          <div className="flex items-center gap-2 mt-2 text-xs text-success bg-success-bg border border-success-border rounded-lg px-3 py-2">
            <Link className="w-3.5 h-3.5 flex-shrink-0" />
            Link do Google Drive detectado — a imagem será convertida automaticamente.
          </div>
        )}
      </div>

      {/* Categoria + Material */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Categoria</label>
          <select name="categoria" value={form.categoria} onChange={handleChange} className="form-input">
            {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="form-label">Material</label>
          <select name="material" value={form.material} onChange={handleChange} className="form-input">
            {NOMES_MATERIAIS.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </div>

      {/* Finalidade */}
      <div>
        <label className="form-label">Finalidade / Descrição *</label>
        <textarea name="finalidade" value={form.finalidade} onChange={handleChange} rows={3}
          placeholder="Descreva o objetivo e uso da peça impressa..."
          className="form-input resize-none" />
        {errors.finalidade && <p className="text-xs text-error mt-1">{errors.finalidade}</p>}
      </div>

      {/* Ações */}
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={uploading}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {projeto ? "Salvar alterações" : "Adicionar projeto"}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">
          <X className="w-4 h-4" /> Cancelar
        </button>
      </div>
    </form>
  );
}
