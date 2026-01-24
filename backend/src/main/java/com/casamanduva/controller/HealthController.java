package com.casamanduva.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/")
    public String home() {
        return "Casamanduva Backend is UP";
    }

    @GetMapping("/health")
    public String health() {
        return "OK";
    }
}

