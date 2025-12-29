package com.casamanduva;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class CasamanduvaApplication {

    public static void main(String[] args) {
        SpringApplication.run(CasamanduvaApplication.class, args);
    }
}
