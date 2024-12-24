package com.yunussemree.fas_travel.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Tüm endpoint'ler
                .allowedOrigins("http://localhost:4200") // Angular uygulamasının adresi
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // İzin verilen HTTP metodları
                .allowedHeaders("*") // İzin verilen HTTP header'ları
                .allowCredentials(true); // Çerezlerin iletilmesine izin ver
    }
}
