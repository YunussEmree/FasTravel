package com.yunussemree.fas_travel.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@Configuration
@EntityScan("com.yunussemree.fas_travel")
@EnableJpaRepositories("com.yunussemree.fas_travel")
@EnableTransactionManagement
public class DomainConfig {
}
