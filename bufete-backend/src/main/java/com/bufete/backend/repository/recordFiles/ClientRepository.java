package com.bufete.backend.repository.recordFiles;

import java.util.List;
import java.util.Optional;

import com.bufete.backend.model.recordFiles.Client;
import com.bufete.backend.model.recordFiles.ClientsView;
import com.bufete.backend.model.shared.StatusName;

import com.bufete.backend.payload.recordFiles.ChildClientRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

  Optional<Client> findByName(String name);

  @Query("SELECT cv FROM ClientsView cv WHERE cv.name LIKE %:searchText%")
  Page<ClientsView> getPagedClientsView(@Param("searchText") String searchText, Pageable pageable);

  @Query("SELECT cl FROM Client cl WHERE cl.status = :status")
  List<Client> findClientsByStatus(@Param("status") StatusName status);

  @Query("SELECT cl FROM ClientsView cl WHERE (cl.name LIKE %:search% OR cl.lastName LIKE %:search%) AND cl.status = 'ACTIVO'")
  List<ClientsView> searchClient(@Param("search") String search);

  @Query("SELECT cv FROM ClientsView cv")
  List<ClientsView> findAllView();

  @Query("SELECT new com.bufete.backend.payload.recordFiles.ChildClientRequest(c.id, TRIM(CONCAT(c.name, ' ', nullif(c.lastName, ''))), c.nit, sc.name, c.status) FROM Client c INNER JOIN SharedCatalog sc ON c.clientType = sc.id AND sc.type = 1 AND sc.status = 'ACTIVO' WHERE c.parentClient.id = :parentId")
  List<ChildClientRequest> findClientsByParentId(@Param("parentId") Long parentId);

  @Query("SELECT c FROM Client c WHERE c.id IN (:clientList)")
  List<Client> findClientsByListId(@Param("clientList") List<Long> clientList);

  @Query("SELECT new com.bufete.backend.payload.recordFiles.ChildClientRequest(c.id, TRIM(CONCAT(c.name, ' ', nullif(c.lastName, ''))), c.nit, sc.name, c.status) " +
          "FROM Client c INNER JOIN SharedCatalog sc ON c.clientType = sc.id AND sc.type = 1 AND sc.status = 'ACTIVO' WHERE c.parentClient is null AND c.clientType <> :clientType AND c.status = 'ACTIVO'")
  List<ChildClientRequest> findChildClients(@Param("clientType") Integer clientType);

  @Query("SELECT new com.bufete.backend.payload.recordFiles.ChildClientRequest(c.id, TRIM(CONCAT(c.name, ' ', nullif(c.lastName, ''))), c.nit, sc.name, c.status) " +
          "FROM Client c INNER JOIN SharedCatalog sc ON c.clientType = sc.id AND sc.type = 1 AND sc.status = 'ACTIVO' " +
          "WHERE (c.name LIKE %:search% OR c.lastName LIKE %:search%) AND c.parentClient is null AND c.clientType <> :clientType AND c.status = 'ACTIVO'")
  List<ChildClientRequest> searchChildClients(@Param("clientType") Integer clientType, @Param("search") String search);
}