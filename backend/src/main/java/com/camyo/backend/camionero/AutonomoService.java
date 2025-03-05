package com.camyo.backend.camionero;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AutonomoService {

    private final AutonomoRepository autonomoRepository;

    @Autowired
    public AutonomoService(AutonomoRepository autonomoRepository) {
        this.autonomoRepository = autonomoRepository;
    }

    @Transactional()
    public Autonomo guardarAutonomo(Autonomo autonomo) {
        return autonomoRepository.save(autonomo);
    }

    
}
