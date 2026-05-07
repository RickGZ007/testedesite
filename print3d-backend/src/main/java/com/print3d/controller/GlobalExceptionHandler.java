package com.print3d.controller;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.*;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

// ─────────────────────────────────────────────────────────────────────────────
// GlobalExceptionHandler  –  devolve mensagens de erro limpas para o front
// ─────────────────────────────────────────────────────────────────────────────
@RestControllerAdvice
public class GlobalExceptionHandler {

    // Erros de validação (@Valid no controller)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidation(
            MethodArgumentNotValidException ex) {
        Map<String, String> erros = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(err -> {
            String campo = ((FieldError) err).getField();
            erros.put(campo, err.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(erros);
    }

    // Entidade não encontrada
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> handleNotFound(EntityNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    // Upload inválido
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArg(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    // Genérico
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGeneric(Exception ex) {
        return ResponseEntity.internalServerError()
                .body("Erro interno: " + ex.getMessage());
    }
}
