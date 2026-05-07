package com.print3d.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

// ─────────────────────────────────────────────────────────────────────────────
// Projeto.java  –  Entidade JPA mapeada para a tabela "projeto"
// ─────────────────────────────────────────────────────────────────────────────
@Entity
@Table(name = "projeto")
@Getter @Setter @NoArgsConstructor
public class Projeto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Título é obrigatório")
    @Column(nullable = false)
    private String titulo;

    // URL pública da imagem (local ou externa)
    private String imagem;

    @Column(nullable = false)
    private String categoria;

    @Column(nullable = false)
    private String material;

    @NotBlank(message = "Finalidade é obrigatória")
    @Column(columnDefinition = "TEXT")
    private String finalidade;
}
