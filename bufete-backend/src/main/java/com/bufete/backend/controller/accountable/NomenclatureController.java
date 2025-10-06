package com.bufete.backend.controller.accountable;

import com.bufete.backend.payload.accountable.NomenclatureRequest;
import com.bufete.backend.payload.accountable.NomenclatureResponse;
import com.bufete.backend.payload.accountable.NomenclatureResponseList;
import com.bufete.backend.payload.shared.ShareCatResponse;
import com.bufete.backend.service.accountable.NomenclatureService;
import com.bufete.backend.util.RoleConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*" )
@RestController
@RequestMapping("/api/nomenclatures")
public class NomenclatureController {
    @Autowired
    private NomenclatureService nomenclatureService;

    @GetMapping
    @Secured({RoleConstants.NOMENCLATURA_CONTABLE_LECTURA, RoleConstants.USUARIO_ADMIN})
    public List<NomenclatureResponseList> getNomenclatures() {
        return nomenclatureService.getAllNomenclature();
    }

    @GetMapping("/search")
    @Secured({RoleConstants.NOMENCLATURA_CONTABLE_LECTURA, RoleConstants.USUARIO_ADMIN})
    public List<ShareCatResponse> getNomenclatureList(@RequestParam(value = "params", required = false) String params) {
        return nomenclatureService.getNomenclatureList(params);
    }

    @GetMapping("/get/{nomenclatureId}")
    @Secured({RoleConstants.NOMENCLATURA_CONTABLE_LECTURA, RoleConstants.USUARIO_ADMIN})
    public NomenclatureResponse getNomenclature(@PathVariable Long nomenclatureId) {
        return nomenclatureService.getNomenclature(nomenclatureId);
    }

    @PostMapping
    @Secured({ RoleConstants.NOMENCLATURA_CONTABLE_CREA, RoleConstants.USUARIO_ADMIN})
    public void createNomenclature(@Valid @RequestBody NomenclatureRequest request) throws Exception {
        nomenclatureService.createNomenclature(request);
    }

    @DeleteMapping("{nomenclatureId}")
    @Secured({ RoleConstants.NOMENCLATURA_CONTABLE_CAMBIA_ESTADO, RoleConstants.USUARIO_ADMIN})
    public void deleteNomenclature(@PathVariable Long nomenclatureId) {
        nomenclatureService.deleteNomenclature(nomenclatureId);
    }
}
