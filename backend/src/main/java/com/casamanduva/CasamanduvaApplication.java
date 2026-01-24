package com.casamanduva;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync  // 🔥 ADDED THIS TO ENABLE ASYNC EMAIL SENDING
public class CasamanduvaApplication {

    public static void main(String[] args) {
        SpringApplication.run(CasamanduvaApplication.class, args);
    }
}