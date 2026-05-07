package com.print3d.service;

import com.print3d.model.Projeto;
import com.print3d.repository.ProjetoRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

// ─────────────────────────────────────────────────────────────────────────────
// ProjetoService  –  regras de negócio dos projetos
// ─────────────────────────────────────────────────────────────────────────────
@Service
@RequiredArgsConstructor
public class ProjetoService {

    private final ProjetoRepository repo;

    // ── Listagem ──────────────────────────────────────────────────────────
    public List<Projeto> listarTodos() {
        return repo.findAll();
    }

    public Projeto buscarPorId(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Projeto #" + id + " não encontrado"));
    }

    // ── Criação ───────────────────────────────────────────────────────────
    @Transactional
    public Projeto criar(Projeto projeto) {
        projeto.setId(null); // garante que é insert e não update
        return repo.save(projeto);
    }

    // ── Atualização ───────────────────────────────────────────────────────
    @Transactional
    public Projeto atualizar(Long id, Projeto dados) {
        Projeto existente = buscarPorId(id);
        existente.setTitulo(dados.getTitulo());
        existente.setImagem(dados.getImagem());
        existente.setCategoria(dados.getCategoria());
        existente.setMaterial(dados.getMaterial());
        existente.setFinalidade(dados.getFinalidade());
        return repo.save(existente);
    }

    // ── Exclusão ──────────────────────────────────────────────────────────
    @Transactional
    public void excluir(Long id) {
        if (!repo.existsById(id)) {
            throw new EntityNotFoundException("Projeto #" + id + " não encontrado");
        }
        repo.deleteById(id);
    }
}
