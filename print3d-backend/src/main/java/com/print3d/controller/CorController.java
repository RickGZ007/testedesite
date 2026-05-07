package com.print3d.controller;

import com.print3d.model.Cor;
import com.print3d.service.CorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// ─────────────────────────────────────────────────────────────────────────────
// CorController
// GET  /api/cores          → lista todas as cores
// PUT  /api/cores/{id}     → atualiza cor (nome, hex, emEstoque)
// PUT  /api/cores/{id}/toggle → alterna emEstoque true/false
// ─────────────────────────────────────────────────────────────────────────────
@RestController
@RequestMapping("/api/cores")
@RequiredArgsConstructor
public class CorController {

    private final CorService service;

    @GetMapping
    public List<Cor> listar() {
        return service.listarTodas();
    }

    // Alterna disponibilidade (chamado pelo clique no admin)
    @PutMapping("/{id}/toggle")
    public ResponseEntity<Cor> toggle(@PathVariable Long id) {
        return ResponseEntity.ok(service.alternarEstoque(id));
    }

    // Atualiza todos os campos (futuro)
    @PutMapping("/{id}")
    public ResponseEntity<Cor> atualizar(
            @PathVariable Long id,
            @RequestBody Cor dados) {
        return ResponseEntity.ok(service.atualizar(id, dados));
    }
}
