package com.print3d.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cor")
@Getter @Setter @NoArgsConstructor
public class Cor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    @Column(nullable = false)
    private String nome;

    @NotBlank(message = "Hex é obrigatório")
    @Column(nullable = false)
    private String hex;

    @Column(nullable = false)
    private boolean emEstoque = true;
}
