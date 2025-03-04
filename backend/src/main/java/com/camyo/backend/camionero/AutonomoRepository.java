package com.camyo.backend.camionero;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AutonomoRepository extends JpaRepository<Autonomo, Integer> {
    
}
