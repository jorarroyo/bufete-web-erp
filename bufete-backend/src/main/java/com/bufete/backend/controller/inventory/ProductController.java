package com.bufete.backend.controller.inventory;

import java.util.List;

import javax.validation.Valid;

import com.bufete.backend.model.shared.ProductType;
import com.bufete.backend.payload.inventory.ProductListResponse;
import com.bufete.backend.payload.inventory.ProductMovResponse;
import com.bufete.backend.payload.inventory.ProductPropertyResponse;
import com.bufete.backend.payload.inventory.ProductRequest;
import com.bufete.backend.payload.inventory.ProductResponse;
import com.bufete.backend.payload.inventory.StampRequest;
import com.bufete.backend.payload.shared.PagedResponse;
import com.bufete.backend.payload.shared.ShareCatResponse;
import com.bufete.backend.security.CurrentUser;
import com.bufete.backend.security.UserPrincipal;
import com.bufete.backend.service.inventory.ProductService;
import com.bufete.backend.service.inventory.StampService;
import com.bufete.backend.util.AppConstants;
import com.bufete.backend.util.RoleConstants;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*" )
@RestController
@RequestMapping("/api/product")
public class ProductController {

  @Autowired
  private ProductService productService;

  @Autowired
  private StampService stampService;

  @GetMapping
  @Secured({ RoleConstants.PRODUCTO_LECTURA, RoleConstants.USUARIO_ADMIN })
  public PagedResponse<ProductListResponse> getProductPaged(@CurrentUser UserPrincipal currentUser,
      @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
      @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
      @RequestParam(value = "searchText", defaultValue = "") String searchText,
      @RequestParam(value = "sort", defaultValue = "assignDate") String sort,
      @RequestParam(value = "direction", defaultValue = "desc") String direction) {
    return productService.getAllProductView(currentUser, page, size, searchText, sort, direction);
  }

  @PostMapping
  @Secured({ RoleConstants.PRODUCTO_CREA, RoleConstants.USUARIO_ADMIN })
  public Long createStampDuty(@Valid @RequestBody ProductRequest productRequest) {
    return productService.createProduct(productRequest);
  }

  @GetMapping("/detail/{param}/{type}")
  @Secured({ RoleConstants.PRODUCTO_LECTURA, RoleConstants.USUARIO_ADMIN })
  public ProductResponse getProductById(@PathVariable String param, @PathVariable ProductType type) {
    return productService.getProductById(param, type);
  }

  @GetMapping("/properties/{type}")
  @Secured({ RoleConstants.PRODUCTO_LECTURA, RoleConstants.USUARIO_ADMIN })
  public List<ProductPropertyResponse> getPropertyByType(@PathVariable ProductType type) {
    return productService.getPropertiesByType(type);
  }

  @GetMapping("/stamps/{stampId}")
  @Secured({ RoleConstants.PRODUCTO_LECTURA, RoleConstants.USUARIO_ADMIN })
  public StampRequest getStampById(@PathVariable Long stampId) {
    return stampService.getStampById(stampId);
  }

  @PostMapping("/stamps")
  @Secured({ RoleConstants.PRODUCTO_CREA, RoleConstants.USUARIO_ADMIN })
  public Long createStamp(@Valid @RequestBody StampRequest stampRequest) {
    return stampService.createStamp(stampRequest);
  }

  @DeleteMapping("/{productId}")
  @Secured({ RoleConstants.PRODUCTO_ELIMINA, RoleConstants.USUARIO_ADMIN })
  public void deleteStampDuty(@PathVariable Long productId) {
    productService.deleteProduct(productId);
  }

  @GetMapping("/stamps/search-list")
  @Secured({ RoleConstants.PRODUCTO_LECTURA, RoleConstants.TIMBRE_FISCAL_INVENTARIO_LISTADO_PRODUCTO,
      RoleConstants.USUARIO_ADMIN })
  public List<ShareCatResponse> getSearchList() {
    return stampService.getStampList();
  }

  @GetMapping("/stamp-detail/{productId}")
  @Secured({ RoleConstants.PRODUCTO_LECTURA, RoleConstants.TIMBRE_FISCAL_INVENTARIO_LISTADO_PRODUCTO,
      RoleConstants.USUARIO_ADMIN })
  public ProductListResponse getSelectedById(@PathVariable Long productId) {
    return stampService.getSelectedStampById(productId);
  }

  @GetMapping("/prod-mov")
  @Secured({ RoleConstants.PRODUCTO_LECTURA, RoleConstants.USUARIO_ADMIN })
  public PagedResponse<ProductMovResponse> getProductMovByProdId(@CurrentUser UserPrincipal currentUser,
      @RequestParam(value = "productId") Long productId,
      @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
      @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
      @RequestParam(value = "searchText", defaultValue = "") String searchText,
      @RequestParam(value = "sort", defaultValue = "id") String sort,
      @RequestParam(value = "direction", defaultValue = "desc") String direction) {
    return productService.getProductMovByProdId(currentUser, productId, page, size, searchText, sort, direction);
  }

  @GetMapping("/product-list/{productType}")
  @Secured({ RoleConstants.PRODUCTO_LECTURA, RoleConstants.USUARIO_ADMIN })
  public List<ProductListResponse> getProductByType(@PathVariable ProductType productType) {
    return productService.getProductListByType(productType);
  }
}