package com.print3d.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

// ─────────────────────────────────────────────────────────────────────────────
// HealthController — Railway usa GET / para verificar se o app está rodando
// ─────────────────────────────────────────────────────────────────────────────
@RestController
public class HealthController {

    @GetMapping("/")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "app",    "print3d-backend"
        ));
    }
}
