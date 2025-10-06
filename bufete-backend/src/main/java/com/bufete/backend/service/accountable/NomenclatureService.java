package com.bufete.backend.service.accountable;

import com.bufete.backend.exception.ResourceNotFoundException;
import com.bufete.backend.model.accountable.Nomenclature;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.accountable.NomenclatureRequest;
import com.bufete.backend.payload.accountable.NomenclatureResponse;
import com.bufete.backend.payload.accountable.NomenclatureResponseList;
import com.bufete.backend.payload.shared.ShareCatResponse;
import com.bufete.backend.repository.accountable.NomenclatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NomenclatureService {

    @Autowired
    private NomenclatureRepository nomenclatureRepository;

    public List<NomenclatureResponseList> getAllNomenclature() {
        List<Nomenclature> nomenclatureList = nomenclatureRepository.findAllByStatus(StatusName.ACTIVO);
        return nomenclatureList
                .stream().map(n ->
                        new NomenclatureResponseList(n.getId(), n.getCode(), n.getName(), n.getStatus(), n.getType(),
                        getChildren(n.getChildren())))
                .collect(Collectors.toList());
    }

    public List<ShareCatResponse> getNomenclatureList(String search) {
        if (search == null) {
            return nomenclatureRepository.findAllByStatusAndParentNode(StatusName.ACTIVO)
                    .stream().limit(10).map(l ->
                            new ShareCatResponse(l.getId(), l.getCode().concat(" ").concat(l.getName())))
                    .collect(Collectors.toList());
        }
        return nomenclatureRepository.searchNom(search, StatusName.ACTIVO).stream().map(l ->
                new ShareCatResponse(l.getId(), l.getCode().concat(" ").concat(l.getName())))
                .collect(Collectors.toList());
    }

    public NomenclatureResponse getNomenclature(Long nomId) {
        Nomenclature nomenclature = nomenclatureRepository.findById(nomId)
                .orElseThrow(() -> new ResourceNotFoundException("Nomenclature", "id", nomId));
        return new NomenclatureResponse(nomenclature.getId(), nomenclature.getCode(), nomenclature.getName(),
                nomenclature.getStatus(), nomenclature.getType(),
                nomenclature.getParentNode() != null ? nomenclature.getParentNode().getId() : null,
                nomenclature.getParentNode() != null ? String.join(" ", nomenclature.getParentNode().getCode(),
                        nomenclature.getParentNode().getName()) : "");
    }

    @Transactional
    public void createNomenclature(NomenclatureRequest request) throws Exception {
        Nomenclature nomenclature = nomenclatureRepository.checkRepeated(request.getCode(), request.getParentId())
                .orElse(null);
        if (nomenclature != null) {
            throw new Exception("El código ya ha sido asignado");
        }
        Nomenclature parent = null;
        if (request.getParentId() != null) {
            parent = nomenclatureRepository.findById(request.getParentId())
                    .orElse(null);
        }
        Nomenclature entity = new Nomenclature(request.getId(), request.getCode(), request.getName(),
                request.getStatus(), request.getType(), parent);
        nomenclatureRepository.save(entity);
    }

    @Transactional
    public void deleteNomenclature(Long nomId) {
        Nomenclature nomenclature = nomenclatureRepository.findById(nomId)
                .orElseThrow(() -> new ResourceNotFoundException("Nomenclature", "id", nomId));
        nomenclature.setStatus(StatusName.DELETED);
        nomenclatureRepository.save(nomenclature);
    }

    private List<NomenclatureResponseList> getChildren(List<Nomenclature> nomenclatures) {
        return nomenclatures.stream().map(n ->
                new NomenclatureResponseList(n.getId(), n.getCode(), n.getName(), n.getStatus(), n.getType(), getChildren(n.getChildren())))
                .collect(Collectors.toList());
    }
}
