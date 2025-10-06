package com.bufete.backend.service.inventory;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import com.bufete.backend.exception.ResourceNotFoundException;
import com.bufete.backend.model.inventory.Product;
import com.bufete.backend.model.inventory.ProductDetail;
import com.bufete.backend.model.inventory.ProductMovView;
import com.bufete.backend.model.inventory.ProductView;
import com.bufete.backend.model.shared.ProductType;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.inventory.ProductDetailRequest;
import com.bufete.backend.payload.inventory.ProductDetailResponse;
import com.bufete.backend.payload.inventory.ProductListResponse;
import com.bufete.backend.payload.inventory.ProductMovResponse;
import com.bufete.backend.payload.inventory.ProductPropertyResponse;
import com.bufete.backend.payload.inventory.ProductRequest;
import com.bufete.backend.payload.inventory.ProductResponse;
import com.bufete.backend.payload.shared.PagedResponse;
import com.bufete.backend.repository.inventory.ProductDetailRepository;
import com.bufete.backend.repository.inventory.ProductMovRepository;
import com.bufete.backend.repository.inventory.ProductRepository;
import com.bufete.backend.security.UserPrincipal;
import com.bufete.backend.util.Validators;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductService {

  @Autowired
  private ProductRepository productRepository;

  @Autowired
  private ProductDetailRepository productDetailRepository;

  @Autowired
  private ProductMovRepository productMovRepository;

  public PagedResponse<ProductListResponse> getAllProductView(UserPrincipal currentUser, int page, int size, String searchText, String sort, String direction) {
    Validators.validatePageNumberAndSize(page, size);

    Pageable pageable = PageRequest.of(page, size, direction.equals("desc") ? Sort.Direction.DESC : Sort.Direction.ASC, Validators.toCamelCase(sort));
    Page<ProductView> products = productRepository.getAllProductView(searchText, ProductType.TIMBRES, StatusName.ACTIVO, pageable);

    if (products.getNumberOfElements() == 0) {
      return new PagedResponse<>(Collections.emptyList(), products.getNumber(), products.getSize(), products.getTotalElements(), products.getTotalPages(), products.isLast());
    }

    List<ProductListResponse> productResponse = products.stream().map(prods -> {
      return new ProductListResponse(prods.getId(), prods.getProductCode(), prods.getProductName(), prods.getUnitValue(), prods.getMinQuantity(), prods.getProductExistence());
    }).collect(Collectors.toList());

    return new PagedResponse<>(productResponse, products.getNumber(), products.getSize(), products.getTotalElements(), products.getTotalPages(), products.isLast());
  }

  @Transactional
  public Long createProduct(ProductRequest productRequest) {
    Product product = new Product(productRequest.getId(), productRequest.getProductCode(), productRequest.getProductName(), 
      productRequest.getProductInvType(), productRequest.getStatus(), productRequest.getUnitValue(), productRequest.getMinQuantity(), 0d);
    productRepository.save(product);
    for (ProductDetailRequest details : productRequest.getDetailList()) {
      ProductDetail detail = new ProductDetail(details.getId(), product.getId(), details.getProductProperty(), details.getPropertyValue());
      productDetailRepository.save(detail);
    }

    return product.getId();
  }

  public ProductResponse getProductById(String param, ProductType productType) {
    if (param.equals("new")) {
      List<ProductDetailResponse> detailList = 
        productRepository.getProdPropertyByTypeAndStatus(productType, StatusName.ACTIVO).stream().map(det -> {
          return new ProductDetailResponse(null, det.getPropertyName(), det.getPropertyColumnName(), det.getId(), null);
        }).collect(Collectors.toList());
      return new ProductResponse(null, "", null, productType, StatusName.ACTIVO, 0.0, 0d, detailList);

    } else {
      Long id = Long.parseLong(param);
      Product product = productRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
      List<ProductDetailResponse> detailList = productDetailRepository.getDetailViewByTypeAndStatusAndProdId(productType, StatusName.ACTIVO, id).stream()
      .map(det -> {
        return new ProductDetailResponse(det.getId(), det.getPropertyName(), det.getPropertyColumnName(), det.getProductProperty(), det.getPropertyValue());
      }).collect(Collectors.toList());
      return new ProductResponse(product.getId(), product.getProductCode(), product.getProductName(), productType, 
        product.getStatus(), product.getUnitValue(), product.getMinQuantity(), detailList);
    }
  }

  public List<ProductPropertyResponse> getPropertiesByType(ProductType type) {
    return productRepository.getProdPropertyByTypeAndStatus(type, StatusName.ACTIVO)
      .stream().map(pp -> {
        return new ProductPropertyResponse(pp.getId(), pp.getPropertyName(), pp.getPropertyColumnName());
      }).collect(Collectors.toList());
  }

  @Transactional
  public void deleteProduct(Long id) {
    productRepository.productStatusChange(id, StatusName.DELETED);
  }

  public PagedResponse<ProductMovResponse> getProductMovByProdId(UserPrincipal currentUser, Long productId, int page, int size, String searchText, String sort, String direction) {
    Validators.validatePageNumberAndSize(page, size);

    Pageable pageable = PageRequest.of(page, size, direction.equals("desc") ? Sort.Direction.DESC : Sort.Direction.ASC, Validators.toCamelCase(sort));
    Page<ProductMovView> products = productMovRepository.getProdMovViewByProdId(searchText, productId, pageable);

    if (products.getNumberOfElements() == 0) {
      return new PagedResponse<>(Collections.emptyList(), products.getNumber(), products.getSize(), products.getTotalElements(), products.getTotalPages(), products.isLast());
    }

    List<ProductMovResponse> productResponse = products.stream().map(prod -> {
      return new ProductMovResponse(prod.getId(), prod.getRequestDate(), prod.getRequesterName(), prod.getFileNum(), prod.getAction(), prod.getQuantity(), prod.getProductId());
    }).collect(Collectors.toList());

    return new PagedResponse<>(productResponse, products.getNumber(), products.getSize(), products.getTotalElements(), products.getTotalPages(), products.isLast());
  }

  public List<ProductListResponse> getProductListByType(ProductType productType) {
    return productRepository.getProductViewByTypeAndByStatus(productType, StatusName.ACTIVO).stream().map(prods -> {
      return new ProductListResponse(prods.getId(), prods.getProductCode(), prods.getProductName(), prods.getUnitValue(), prods.getMinQuantity(), prods.getProductExistence());
    }).collect(Collectors.toList());
  }

  public boolean validateExistence(Long productId, Double quantity) {
    Product product = productRepository.findById(productId)
      .orElseThrow(() -> new ResourceNotFoundException("Product", "id", productId));
    return product.getProductExistence() <= quantity;
  }
}