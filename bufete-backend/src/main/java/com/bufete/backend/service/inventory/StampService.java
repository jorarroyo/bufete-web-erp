package com.bufete.backend.service.inventory;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import com.bufete.backend.exception.ResourceNotFoundException;
import com.bufete.backend.model.inventory.Product;
import com.bufete.backend.model.inventory.ProductDetail;
import com.bufete.backend.model.inventory.ProductDetailView;
import com.bufete.backend.model.inventory.ProductView;
import com.bufete.backend.model.shared.ProductType;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.inventory.ProductListResponse;
import com.bufete.backend.payload.inventory.StampRequest;
import com.bufete.backend.payload.shared.ShareCatResponse;
import com.bufete.backend.repository.inventory.ProductDetailRepository;
import com.bufete.backend.repository.inventory.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StampService {

  @Autowired
  private ProductRepository productRepository;

  @Autowired
  private ProductDetailRepository productDetailRepository;

  @Transactional
  public Long createStamp(StampRequest stampRequest) {
    Product product = new Product(stampRequest.getId(), stampRequest.getProductCode(), stampRequest.getProductName(), 
      ProductType.TIMBRES, StatusName.ACTIVO, stampRequest.getUnitValue(), stampRequest.getMinQuantity(), 0d);
    productRepository.save(product);
    List<ProductDetail> detail = new ArrayList<ProductDetail>();
    detail.add(new ProductDetail(null, product.getId(), 1l, stampRequest.getProductType().toString()));
    detail.add(new ProductDetail(null, product.getId(), 2l, stampRequest.getDesignationType().toString()));
    detail.add(new ProductDetail(null, product.getId(), 3l, stampRequest.getYear().toString()));
    productDetailRepository.saveAll(detail);
    return product.getId();
  }
  
  public StampRequest getStampById(Long stampId) {
    Product product = productRepository.findById(stampId)
        .orElseThrow(() -> new ResourceNotFoundException("Product", "id", stampId));
    
    StampRequest response = 
      new StampRequest(product.getId(), product.getProductCode(), product.getProductName(), product.getUnitValue(), product.getMinQuantity());

    List<ProductDetailView> detailList = productDetailRepository.getDetailViewByTypeAndStatusAndProdId(ProductType.TIMBRES, StatusName.ACTIVO, stampId);
    detailList.forEach(det -> {
      switch (det.getProductProperty().toString()) {
        case "1":
          response.setProductType(Long.parseLong(det.getPropertyValue()));
          break;
        case "2":
          response.setDesignationType(Long.parseLong(det.getPropertyValue()));
          break;
        case "3":
          response.setYear(Integer.parseInt(det.getPropertyValue()));
          break;
        default:
          break;
      }
    });
    return response;
  }

  public List<ShareCatResponse> getStampList() {
    return productRepository.getProductViewByTypeAndByStatus(ProductType.TIMBRES, StatusName.ACTIVO)
      .stream().map(det -> {
        return new ShareCatResponse(det.getId(), det.getProductCode() + " " + det.getProductName());
      }).collect(Collectors.toList());
  }

  public ProductListResponse getSelectedStampById(Long id) {
    ProductView product = productRepository.getProductViewById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
    return new ProductListResponse(product.getId(), product.getProductCode(), product.getProductName(), product.getUnitValue(), product.getMinQuantity(), product.getProductExistence());
  }
}