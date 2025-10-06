package com.bufete.backend.service.catalogs;

import com.bufete.backend.exception.ResourceNotFoundException;
import com.bufete.backend.model.catalogs.Concept;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.catalogs.ConceptRequest;
import com.bufete.backend.payload.catalogs.ConceptResponse;
import com.bufete.backend.payload.catalogs.ConceptResponseView;
import com.bufete.backend.repository.catalogs.ConceptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConceptService {

    @Autowired
    private ConceptRepository conceptRepository;

    public List<ConceptResponseView> getConceptList(String param) {
        if (param.equals("active")) {
            return conceptRepository.findAllView()
                    .stream().filter(cn -> cn.getStatus().equals(StatusName.ACTIVO))
                    .map(concept -> new ConceptResponseView(concept.getId(), concept.getCode(),
                            concept.getName(), concept.getType(), concept.getStatus(),
                            concept.getCreated(), concept.getModified())).collect(Collectors.toList());
        }
        return conceptRepository.findAllView()
                .stream()
                .map(concept -> new ConceptResponseView(concept.getId(), concept.getCode(),
                        concept.getName(), concept.getType(), concept.getStatus(),
                        concept.getCreated(), concept.getModified())).collect(Collectors.toList());
    }

    public Concept createConcept(ConceptRequest conceptRequest) {
        Concept concept = new Concept(conceptRequest.getCode(), conceptRequest.getName(), conceptRequest.getType(),
                conceptRequest.getStatus());
        return conceptRepository.save(concept);
    }

    public ConceptResponse getConceptById(Long conceptId) {
        Concept concept = conceptRepository.findById(conceptId)
                .orElseThrow(() -> new ResourceNotFoundException("Concept", "id", conceptId));
        return new ConceptResponse(concept.getId(), concept.getCode(), concept.getName(), concept.getType(), concept.getStatus());
    }

    public void updateConcept(ConceptRequest conceptRequest) {
        Concept concept = conceptRepository.findById(conceptRequest.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Concept", "id", conceptRequest.getId()));
        concept.setCode(conceptRequest.getCode());
        concept.setName(conceptRequest.getName());
        concept.setType(conceptRequest.getType());
        conceptRepository.save(concept);
    }

    public void deleteConcept(Long conceptId) {
        Concept concept = conceptRepository.findById(conceptId)
                .orElseThrow(() -> new ResourceNotFoundException("Concept", "id", conceptId));
        concept.setStatus(StatusName.ELIMINADO);
        conceptRepository.save(concept);
    }

    public List<ConceptResponse> searchConceptsByCodeAndName(String search) {
        if (search == null) {
            return conceptRepository.findAll().stream().limit(10)
                    .map(concept -> new ConceptResponse(concept.getId(), concept.getCode(),
                            concept.getName(), concept.getType(), concept.getStatus())).collect(Collectors.toList());
        }
        return conceptRepository.searchConcept(search).stream()
                .map(concept -> new ConceptResponse(concept.getId(), concept.getCode(),
                        concept.getName(), concept.getType(), concept.getStatus())).collect(Collectors.toList());
    }
}
