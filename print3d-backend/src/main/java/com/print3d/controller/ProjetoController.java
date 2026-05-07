package com.print3d.controller;

import com.print3d.model.Projeto;
import com.print3d.service.ProjetoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// ─────────────────────────────────────────────────────────────────────────────
// ProjetoController  –  CRUD de projetos
//
// GET    /api/projetos          → lista todos
// GET    /api/projetos/{id}     → busca por id
// POST   /api/projetos          → cria novo
// PUT    /api/projetos/{id}     → atualiza
// DELETE /api/projetos/{id}     → exclui
// ─────────────────────────────────────────────────────────────────────────────
@RestController
@RequestMapping("/api/projetos")
@RequiredArgsConstructor
public class ProjetoController {

    private final ProjetoService service;

    @GetMapping
    public List<Projeto> listar() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Projeto> buscar(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Projeto> criar(@Valid @RequestBody Projeto projeto) {
        Projeto salvo = service.criar(projeto);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Projeto> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody Projeto projeto) {
        return ResponseEntity.ok(service.atualizar(id, projeto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build(); // 204
    }
}
