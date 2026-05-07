package com.print3d.repository;

import com.print3d.model.Projeto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// ─────────────────────────────────────────────────────────────────────────────
// ProjetoRepository  –  acesso ao banco via Spring Data JPA
// Adicione métodos de busca personalizada abaixo conforme precisar.
// ─────────────────────────────────────────────────────────────────────────────
@Repository
public interface ProjetoRepository extends JpaRepository<Projeto, Long> {

    // Busca por categoria (usável no futuro pelo front)
    List<Projeto> findByCategoriaIgnoreCase(String categoria);

    // Busca por material
    List<Projeto> findByMaterialIgnoreCase(String material);
}
