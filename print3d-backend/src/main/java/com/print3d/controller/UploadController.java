package com.print3d.controller;

import com.print3d.service.UploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

// ─────────────────────────────────────────────────────────────────────────────
// UploadController  –  recebe o arquivo, salva no disco e devolve a URL
//
// POST /api/upload   (multipart/form-data, campo "file")
// Retorna: { "url": "http://localhost:8080/uploads/uuid_nome.jpg" }
// ─────────────────────────────────────────────────────────────────────────────
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UploadController {

    private final UploadService uploadService;

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> upload(
            @RequestParam("file") MultipartFile arquivo) throws IOException {

        if (arquivo.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("erro", "Arquivo vazio."));
        }

        String url = uploadService.salvar(arquivo);
        return ResponseEntity.ok(Map.of("url", url));
    }
}
