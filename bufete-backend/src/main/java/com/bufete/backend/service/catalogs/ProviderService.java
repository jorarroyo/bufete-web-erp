package com.bufete.backend.service.catalogs;

import com.bufete.backend.exception.ResourceNotFoundException;
import com.bufete.backend.model.catalogs.Provider;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.catalogs.ProviderRequest;
import com.bufete.backend.payload.catalogs.ProviderResponse;
import com.bufete.backend.payload.catalogs.ProviderResponseView;
import com.bufete.backend.repository.catalogs.ProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProviderService {

    @Autowired
    private ProviderRepository providerRepository;

    public List<ProviderResponseView> getProviderList(String param) {
        if (param.equals("active")) {
            return providerRepository.findAllView()
                    .stream().filter(pr -> pr.getStatus().equals(StatusName.ACTIVO))
                    .map(provider -> {
                        return new ProviderResponseView(provider.getId(), provider.getCode(),
                                provider.getName(), provider.getStatus(), provider.getCreated(),
                                provider.getModified());
                    }).collect(Collectors.toList());
        }
        return providerRepository.findAllView()
                .stream()
                .map(provider -> {
                    return new ProviderResponseView(provider.getId(), provider.getCode(),
                            provider.getName(), provider.getStatus(), provider.getCreated(),
                            provider.getModified());
                }).collect(Collectors.toList());
    }

    public Provider createProvider(ProviderRequest providerRequest) {
        Provider provider = new Provider(providerRequest.getCode(), providerRequest.getName(), providerRequest.getStatus());
        return providerRepository.save(provider);
    }

    public ProviderResponse getProviderById(Long providerId) {
        Provider provider = providerRepository.findById(providerId)
                .orElseThrow(() -> new ResourceNotFoundException("Provider", "id", providerId));
        return new ProviderResponse(provider.getId(), provider.getCode(), provider.getName(), provider.getStatus());
    }

    public void updateProvider(ProviderRequest providerRequest) {
        Provider provider = providerRepository.findById(providerRequest.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Provider", "id", providerRequest.getId()));
        provider.setCode(providerRequest.getCode());
        provider.setName(providerRequest.getName());
        providerRepository.save(provider);
    }

    public void deleteProvider(Long providerId) {
        Provider provider = providerRepository.findById(providerId)
                .orElseThrow(() -> new ResourceNotFoundException("Provider", "id", providerId));
        provider.setStatus(StatusName.ELIMINADO);
        providerRepository.save(provider);
    }

    public List<ProviderResponse> searchProviderByCodeAndName(String search) {
        if (search == null) {
            return providerRepository.findAll().stream().limit(10)
                    .map(provider -> new ProviderResponse(provider.getId(), provider.getCode(),
                            provider.getName(), provider.getStatus())
                    ).collect(Collectors.toList());
        }
        return providerRepository.searchProvider(search).stream()
                .map(provider -> new ProviderResponse(provider.getId(), provider.getCode(),
                        provider.getName(), provider.getStatus())
                ).collect(Collectors.toList());
    }
}
