package com.print3d.service;

import com.print3d.model.Cor;
import com.print3d.repository.CorRepository;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

// ─────────────────────────────────────────────────────────────────────────────
// CorService
// Popula o banco com as cores padrão na primeira vez que o app sobe.
// Depois disso apenas lê e atualiza o estoque.
// ─────────────────────────────────────────────────────────────────────────────
@Service
@RequiredArgsConstructor
public class CorService {

    private final CorRepository repo;

    // ── Seed: insere cores padrão se o banco estiver vazio ────────────────
    @PostConstruct
    @Transactional
    public void seed() {
        if (repo.count() > 0) return;

        List<Cor> padrao = List.of(
            cor("Branco",       "#F5F5F5", true),
            cor("Preto",        "#1C1C1C", true),
            cor("Cinza",        "#6B7280", true),
            cor("Vermelho",     "#DC2626", true),
            cor("Laranja",      "#F97316", true),
            cor("Amarelo",      "#EAB308", false),
            cor("Verde",        "#16A34A", true),
            cor("Azul",         "#2563EB", true),
            cor("Roxo",         "#7C3AED", false),
            cor("Rosa",         "#EC4899", true),
            cor("Marrom",       "#92400E", false),
            cor("Transparente", "#E0F2FE", true)
        );
        repo.saveAll(padrao);
    }

    private Cor cor(String nome, String hex, boolean emEstoque) {
        Cor c = new Cor();
        c.setNome(nome);
        c.setHex(hex);
        c.setEmEstoque(emEstoque);
        return c;
    }

    // ── CRUD ──────────────────────────────────────────────────────────────
    public List<Cor> listarTodas() {
        return repo.findAll();
    }

    @Transactional
    public Cor alternarEstoque(Long id) {
        Cor cor = repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cor #" + id + " não encontrada"));
        cor.setEmEstoque(!cor.isEmEstoque());
        return repo.save(cor);
    }

    @Transactional
    public Cor atualizar(Long id, Cor dados) {
        Cor cor = repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cor #" + id + " não encontrada"));
        cor.setNome(dados.getNome());
        cor.setHex(dados.getHex());
        cor.setEmEstoque(dados.isEmEstoque());
        return repo.save(cor);
    }
}
