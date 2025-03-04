package com.camyo.backend.oferta;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.camyo.backend.auth.payload.response.MessageResponse;
import com.camyo.backend.camionero.Camionero;
import com.camyo.backend.empresa.Empresa;
import com.camyo.backend.empresa.EmpresaService;
import com.camyo.backend.exceptions.ResourceNotFoundException;

import io.swagger.v3.oas.annotations.tags.Tag;


@RestController
@RequestMapping("/ofertas")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Ofertas", description = "API para gestión de ofertas")
public class OfertaController {

    @Autowired
    private OfertaService ofertaService;

    @Autowired
    private TrabajoService trabajoService;

    @Autowired
    private CargaService cargaService;
    @Autowired
    private EmpresaService empresaService;

   /**
     * GET: Listar todas las ofertas
     * 
     * @return Lista de todas las ofertas disponibles.
     */
    @GetMapping
    public List<Oferta> obtenerOfertas() {
        return ofertaService.obtenerOfertas();
    }

    /**
     * GET: Obtener oferta por ID
     * 
     * @param id ID de la oferta a consultar
     * @return Detalles de la oferta o error si no se encuentra.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Oferta> obtenerOfertaPorId(@PathVariable Integer id) {
        try {
            Oferta oferta = ofertaService.obtenerOfertaPorId(id);
            return ResponseEntity.ok(oferta);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

     /**
     * GET: Obtener ofertas generales
     * 
     * @return Lista de ofertas generales (sin carga).
     */
    @GetMapping("/generales")
    public List<Oferta> obtenerOfertasGenerales() {
        return ofertaService.obtenerOfertasPorTipo();
    }

     /**
     * GET: Obtener ofertas de carga
     * 
     * @return Lista de ofertas de transporte de carga.
     */
    @GetMapping("/cargas")
    public List<Oferta> obtenerOfertasCarga() {
        return ofertaService.obtenerOfertasCarga();
    }


    /**
     * POST: Crear una nueva oferta
     * 
     * Permite crear una oferta y asignarle una empresa.
     * Se debe especificar si es de tipo 'CARGA' o 'TRABAJO'.
     * 
     * @param request DTO con los datos de la oferta, tipo y detalles adicionales.
     * @return Respuesta con la oferta creada o error en caso de fallo.
     */
    @PostMapping
    public ResponseEntity<?> crearOferta(@RequestBody OfertaRequestDTO request) {
        try {
            Empresa empresa = empresaService.obtenerEmpresaPorId(request.getOferta().getEmpresa().getId());
            request.getOferta().setEmpresa(empresa);

            Oferta nuevaOferta = ofertaService.guardarOferta(request.getOferta());

            if ("CARGA".equalsIgnoreCase(request.getTipoOferta()) && request.getCarga() != null) {
                request.getCarga().setOferta(nuevaOferta);
                Carga cargaGuardada = cargaService.guardarCarga(request.getCarga());
                return ResponseEntity.ok(cargaGuardada);
            } 
            else if ("TRABAJO".equalsIgnoreCase(request.getTipoOferta()) && request.getTrabajo() != null) {
                request.getTrabajo().setOferta(nuevaOferta);
                Trabajo trabajoGuardado = trabajoService.guardarTrabajo(request.getTrabajo());
                return ResponseEntity.ok(trabajoGuardado);
            } 
            else {
                return ResponseEntity.badRequest().body("Debe especificar un tipo de oferta válido: 'CARGA' o 'TRABAJO'");
            }
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.badRequest().body("Empresa no encontrada.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error al crear la oferta: " + e.getMessage());
        }
    }

    /**
     * PUT: Actualizar una oferta existente
     *
     * Permite actualizar los detalles de una oferta y, si es necesario, actualizar su carga o trabajo asociado.
     *
     * @param id      ID de la oferta a actualizar.
     * @param request Datos actualizados de la oferta, incluyendo tipo de oferta (CARGA o TRABAJO).
     * @return Oferta actualizada correctamente o error si la oferta no existe.
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarOferta(@PathVariable Integer id, @RequestBody OfertaRequestDTO request) {
        try {
            Oferta ofertaActualizada = ofertaService.modificarOferta(request.getOferta(), id);

            if ("CARGA".equalsIgnoreCase(request.getTipoOferta()) && request.getCarga() != null) {
                Carga carga = ofertaService.obtenerCarga(id);
                if (carga != null) {
                    request.getCarga().setId(carga.getId());
                    request.getCarga().setOferta(ofertaActualizada);
                    Carga cargaActualizada = cargaService.guardarCarga(request.getCarga());
                    return ResponseEntity.ok(cargaActualizada);
                }
            } else if ("TRABAJO".equalsIgnoreCase(request.getTipoOferta()) && request.getTrabajo() != null) {
                Trabajo trabajo = ofertaService.obtenerTrabajo(id);
                if (trabajo != null) {
                    request.getTrabajo().setId(trabajo.getId());
                    request.getTrabajo().setOferta(ofertaActualizada);
                    Trabajo trabajoActualizado = trabajoService.guardarTrabajo(request.getTrabajo());
                    return ResponseEntity.ok(trabajoActualizado);
                }
            }

            return ResponseEntity.ok(ofertaActualizada);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    
    /**
     * DELETE: Eliminar una oferta
     * 
     * @param id ID de la oferta a eliminar
     * @return Respuesta sin contenido si se eliminó correctamente.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarOferta(@PathVariable Integer id) {
        try {
            ofertaService.obtenerOfertaPorId(id); 
            ofertaService.eliminarOferta(id);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }



    /**
     * GET: Obtener el 'Trabajo' asociado a una oferta concreta
     * 
     * Devuelve los detalles del trabajo vinculado a una oferta específica.
     * 
     * @param ofertaId ID de la oferta a consultar
     * @return Trabajo asociado a la oferta o error si no existe.
     */
    @GetMapping("/{ofertaId}/trabajo")
    public ResponseEntity<Trabajo> obtenerTrabajoDeOferta(@PathVariable Integer ofertaId) {
        try {
            Trabajo trabajo = ofertaService.obtenerTrabajo(ofertaId); 
            return ResponseEntity.ok(trabajo);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * POST: Crear un 'Trabajo' y asociarlo a una oferta existente
     * 
     * Permite crear un nuevo trabajo y asignarlo a una oferta específica.
     * 
     * @param ofertaId ID de la oferta a la que se asociará el trabajo
     * @param trabajo  Datos del trabajo a crear
     * @return Trabajo creado correctamente o error si la oferta no existe.
     */
    @PostMapping("/{ofertaId}/trabajo")
    public ResponseEntity<Trabajo> crearTrabajoParaOferta(@PathVariable Integer ofertaId,
                                                          @RequestBody Trabajo trabajo) {
        try {
            Oferta oferta = ofertaService.obtenerOfertaPorId(ofertaId);

            trabajo.setOferta(oferta);

            Trabajo trabajoGuardado = trabajoService.guardarTrabajo(trabajo);
            return ResponseEntity.ok(trabajoGuardado);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * PUT: Actualizar un 'Trabajo' asociado a una oferta
     * 
     * Modifica los detalles de un trabajo vinculado a una oferta.
     * 
     * @param ofertaId       ID de la oferta con el trabajo a actualizar
     * @param trabajoDetalles Nuevos datos del trabajo
     * @return Trabajo actualizado o error si no existe.
     */
    @PutMapping("/{ofertaId}/trabajo")
    public ResponseEntity<Trabajo> actualizarTrabajoDeOferta(@PathVariable Integer ofertaId,
                                                             @RequestBody Trabajo trabajoDetalles) {
        try {

            Trabajo trabajoActual = ofertaService.obtenerTrabajo(ofertaId); 
            trabajoActual.setFechaIncorporacion(trabajoDetalles.getFechaIncorporacion());
            trabajoActual.setJornada(trabajoDetalles.getJornada());

            Trabajo trabajoActualizado = trabajoService.guardarTrabajo(trabajoActual);
            return ResponseEntity.ok(trabajoActualizado);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * DELETE: Eliminar el 'Trabajo' asociado a una oferta
     * 
     * Borra el trabajo vinculado a una oferta específica.
     * 
     * @param ofertaId ID de la oferta cuyo trabajo será eliminado
     * @return Respuesta sin contenido si se eliminó correctamente o error si no existe.
     */
    @DeleteMapping("/{ofertaId}/trabajo")
    public ResponseEntity<Void> eliminarTrabajoDeOferta(@PathVariable Integer ofertaId) {
        try {
            ofertaService.obtenerOfertaPorId(ofertaId);

            Trabajo trabajo = ofertaService.obtenerTrabajo(ofertaId);

            trabajoService.eliminarTrabajo(trabajo.getId());
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }


    /**
     * GET: Obtener la 'Carga' asociada a una oferta
     * 
     * Devuelve los detalles de la carga vinculada a una oferta.
     * 
     * @param ofertaId ID de la oferta a consultar
     * @return Carga asociada a la oferta o error si no existe.
     */
    @GetMapping("/{ofertaId}/carga")
    public ResponseEntity<Carga> obtenerCargaDeOferta(@PathVariable Integer ofertaId) {
        try {
            Carga carga = ofertaService.obtenerCarga(ofertaId);
            return ResponseEntity.ok(carga);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * POST: Crear una 'Carga' y asociarla a una oferta
     * 
     * Permite crear una carga de transporte y asignarla a una oferta específica.
     * 
     * @param ofertaId ID de la oferta a la que se asociará la carga
     * @param carga    Datos de la carga a crear
     * @return Carga creada correctamente o error si la oferta no existe.
     */
    @PostMapping("/{ofertaId}/carga")
    public ResponseEntity<Carga> crearCargaParaOferta(@PathVariable Integer ofertaId,
                                                      @RequestBody Carga carga) {
        try {
            Oferta oferta = ofertaService.obtenerOfertaPorId(ofertaId);
            carga.setOferta(oferta);

            Carga cargaGuardada = cargaService.guardarCarga(carga);
            return ResponseEntity.ok(cargaGuardada);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * PUT: Actualizar la 'Carga' de una oferta
     * 
     * Modifica los detalles de una carga vinculada a una oferta.
     * 
     * @param ofertaId      ID de la oferta con la carga a actualizar
     * @param cargaDetalles Nuevos datos de la carga
     * @return Carga actualizada o error si no existe.
     */
    @PutMapping("/{ofertaId}/carga")
    public ResponseEntity<Carga> actualizarCargaDeOferta(@PathVariable Integer ofertaId,
                                                         @RequestBody Carga cargaDetalles) {
        try {
            Carga cargaActual = ofertaService.obtenerCarga(ofertaId);

            cargaActual.setMercancia(cargaDetalles.getMercancia());
            cargaActual.setPeso(cargaDetalles.getPeso());
            cargaActual.setOrigen(cargaDetalles.getOrigen());
            cargaActual.setDestino(cargaDetalles.getDestino());
            cargaActual.setDistancia(cargaDetalles.getDistancia());
            cargaActual.setInicio(cargaDetalles.getInicio());
            cargaActual.setFinMinimo(cargaDetalles.getFinMinimo());
            cargaActual.setFinMaximo(cargaDetalles.getFinMaximo());

            Carga cargaActualizada = cargaService.guardarCarga(cargaActual);
            return ResponseEntity.ok(cargaActualizada);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

     /**
     * DELETE: Eliminar la 'Carga' de una oferta
     * 
     * Borra la carga vinculada a una oferta específica.
     * 
     * @param ofertaId ID de la oferta cuya carga será eliminada
     * @return Respuesta sin contenido si se eliminó correctamente o error si no existe.
     */
    @DeleteMapping("/{ofertaId}/carga")
    public ResponseEntity<Void> eliminarCargaDeOferta(@PathVariable Integer ofertaId) {
        try {
            ofertaService.obtenerOfertaPorId(ofertaId);
            Carga carga = ofertaService.obtenerCarga(ofertaId);
            cargaService.eliminarCarga(carga.getId());
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }


    /**
     * POST: Aplicar un camionero a una oferta
     * 
     * @param ofertaId    ID de la oferta a la que se aplicará
     * @param camioneroId ID del camionero que aplicará
     * @return Mensaje de éxito si la operación se completó correctamente.
     */
    @PostMapping("/{ofertaId}/aplicar/{camioneroId}")
    public ResponseEntity<MessageResponse> aplicarOferta(@PathVariable Integer ofertaId, @PathVariable Integer camioneroId) {
        try {
            ofertaService.aplicarOferta(ofertaId, camioneroId);
            return ResponseEntity.ok(new MessageResponse("El camionero ha aplicado a la oferta correctamente."));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * GET: Obtener los camioneros que han aplicado a una oferta
     * 
     * @param ofertaId ID de la oferta a consultar
     * @return Lista de camioneros que han aplicado a la oferta.
     */
    @GetMapping("/{ofertaId}/camioneros")
    public ResponseEntity<List<Camionero>> obtenerCamionerosAplicados(@PathVariable Integer ofertaId) {
        try {
            Oferta oferta = ofertaService.obtenerOfertaPorId(ofertaId);
            return ResponseEntity.ok(oferta.getAplicados()); 
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

     /**
     * POST: Desaplicar un camionero de una oferta
     * 
     * @param ofertaId    ID de la oferta de la que se eliminará el camionero
     * @param camioneroId ID del camionero a desaplicar
     * @return Mensaje de éxito si la operación fue completada correctamente.
     */
    @PostMapping("/{ofertaId}/desaplicar/{camioneroId}")
    public ResponseEntity<MessageResponse> desaplicarOferta(@PathVariable Integer ofertaId, @PathVariable Integer camioneroId) {
        try {
            ofertaService.desaplicarOferta(ofertaId, camioneroId);
            return ResponseEntity.ok(new MessageResponse("El camionero ha sido eliminado de la lista de aplicados."));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }


}
