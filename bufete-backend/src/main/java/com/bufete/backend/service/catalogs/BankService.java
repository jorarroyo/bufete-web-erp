package com.bufete.backend.service.catalogs;

import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.shared.ShareCatResponse;
import com.bufete.backend.repository.catalogs.BankRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BankService {

    @Autowired
    private BankRepository bankRepository;

    public List<ShareCatResponse> getBankList() {
        return bankRepository.findAllByStatus(StatusName.ACTIVO)
                .stream()
                .map(s -> new ShareCatResponse(s.getId(), s.getName()))
                .collect(Collectors.toList());
    }
}
