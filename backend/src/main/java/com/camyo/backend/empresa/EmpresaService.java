package com.camyo.backend.empresa;

import java.util.Optional;

import com.camyo.backend.exceptions.ResourceNotFoundException;
import com.camyo.backend.empresa.Empresa;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EmpresaService {

    private EmpresaRepository empresaRepository;

    @Autowired
	public EmpresaService(EmpresaRepository empresaRepository) {
		this.empresaRepository = empresaRepository;
	}


    @Transactional(readOnly = true)
    public Iterable<Empresa> obtenerTodasEmpresas() throws DataAccessException {
        return empresaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Empresa obtenerEmpresaPorId(Long id) throws DataAccessException {
        return empresaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Empresa", "ID", id));
    }

    @Transactional(readOnly = true)
	public Optional<Empresa> obtenerEmpresaPorUsuario(Long usuarioId) throws DataAccessException {
		return empresaRepository.obtenerPorUsuario(usuarioId);
	}

    @Transactional
    public Empresa guardarEmpresa(Empresa empresa) throws DataAccessException {
        empresaRepository.save(empresa);
        return empresa;
    }

	@Transactional
	public Empresa actualizarEmpresa(Empresa empresa, Long id) throws DataAccessException {
		Empresa toUpdate = obtenerEmpresaPorId(id);
		BeanUtils.copyProperties(empresa, toUpdate, "id", "usuario");
		return guardarEmpresa(toUpdate);
	}

	@Transactional
	public void eliminarEmpresa(Long id) throws DataAccessException {
		Empresa toDelete = obtenerEmpresaPorId(id);
		empresaRepository.delete(toDelete);
	}
}
