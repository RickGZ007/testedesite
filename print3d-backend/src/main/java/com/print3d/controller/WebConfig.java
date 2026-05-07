package com.print3d.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

// ─────────────────────────────────────────────────────────────────────────────
// WebConfig — CORS dinâmico via variável de ambiente CORS_ORIGINS
// No Railway defina:
//   CORS_ORIGINS = http://localhost:5173,https://seu-site.netlify.app
// ─────────────────────────────────────────────────────────────────────────────
@Configuration
public class WebConfig implements WebMvcConfigurer {

    // Lê a variável de ambiente CORS_ORIGINS, separada por vírgula
    @Value("#{'${app.cors.allowed-origins}'.split(',')}")
    private String[] allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(allowedOrigins)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(false)
                .maxAge(3600);
    }
}
