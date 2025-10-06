package com.bufete.backend.service.catalogs;

import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.shared.ShareCatResponse;
import com.bufete.backend.repository.catalogs.TransactionTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionTypeService {

    @Autowired
    private TransactionTypeRepository transactionTypeRepository;

    public List<ShareCatResponse> getTransactionTypeList() {
        return transactionTypeRepository.findAllByStatus(StatusName.ACTIVO)
                .stream()
                .map(s -> new ShareCatResponse(s.getId(), s.getName()))
                .collect(Collectors.toList());
    }
}
