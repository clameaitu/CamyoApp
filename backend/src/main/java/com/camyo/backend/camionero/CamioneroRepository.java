package com.camyo.backend.camionero;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CamioneroRepository extends JpaRepository<Camionero, Long> {
   
}
