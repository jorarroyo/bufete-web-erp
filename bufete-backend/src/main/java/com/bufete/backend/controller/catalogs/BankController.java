package com.bufete.backend.controller.catalogs;

import com.bufete.backend.payload.shared.ShareCatResponse;
import com.bufete.backend.service.catalogs.BankService;
import com.bufete.backend.util.RoleConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*" )
@RestController
@RequestMapping("/api/banks")
public class BankController {

    @Autowired
    private BankService bankService;

    @GetMapping("/catalog")
    @Secured({ RoleConstants.BANCO_LECTURA, RoleConstants.USUARIO_ADMIN })
    public List<ShareCatResponse> getBankList() {
        return bankService.getBankList();
    }
}
