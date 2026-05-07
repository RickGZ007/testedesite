package com.print3d.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

// ─────────────────────────────────────────────────────────────────────────────
// UploadService — envia imagem para o Cloudinary e devolve a URL pública.
//
// Cloudinary é gratuito até 25GB de armazenamento.
// Crie sua conta em: https://cloudinary.com
// As credenciais ficam em application.properties.
// ─────────────────────────────────────────────────────────────────────────────
@Service
public class UploadService {

    private final Cloudinary cloudinary;
    private final String folder;

    public UploadService(
            @Value("${cloudinary.cloud-name}") String cloudName,
            @Value("${cloudinary.api-key}")    String apiKey,
            @Value("${cloudinary.api-secret}") String apiSecret,
            @Value("${cloudinary.folder:print3d}") String folder) {

        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key",    apiKey,
                "api_secret", apiSecret,
                "secure",     true
        ));
        this.folder = folder;
    }

    @SuppressWarnings("unchecked")
    public String salvar(MultipartFile arquivo) throws IOException {
        // Valida tipo MIME
        String mime = arquivo.getContentType();
        if (mime == null || !mime.startsWith("image/")) {
            throw new IllegalArgumentException("Apenas imagens são aceitas.");
        }

        // Faz upload para o Cloudinary
        Map<String, Object> resultado = cloudinary.uploader().upload(
                arquivo.getBytes(),
                ObjectUtils.asMap(
                        "folder",          folder,
                        "resource_type",   "image",
                        "use_filename",    true,
                        "unique_filename", true
                )
        );

        // Devolve a URL segura (https)
        return (String) resultado.get("secure_url");
    }
}
