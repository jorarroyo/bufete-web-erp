package com.bufete.backend.controller.catalogs;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import com.bufete.backend.model.catalogs.Activity;
import com.bufete.backend.model.catalogs.ActivityView;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.catalogs.ActivityRequest;
import com.bufete.backend.payload.shared.ApiResponse;
import com.bufete.backend.payload.shared.ShareCatResponse;
import com.bufete.backend.service.catalogs.ActivityService;
import com.bufete.backend.util.RoleConstants;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@CrossOrigin(origins = "*" )
@RestController
@RequestMapping("/api/activity")
public class ActivityController {

  @Autowired
  private ActivityService activityService;

  @GetMapping("/list/{params}")
  @Secured({ RoleConstants.ACTIVIDAD_LECTURA, RoleConstants.USUARIO_ADMIN })
  public List<ActivityView> getAllActivities(@PathVariable String params) {
    return activityService.getActivityList(params);
  }
  
  @GetMapping("/{activityId}")
  @Secured({ RoleConstants.ACTIVIDAD_LECTURA, RoleConstants.USUARIO_ADMIN })
  public ActivityRequest getActivityById(@PathVariable Long activityId) {
    return activityService.getActivityById(activityId);
  }

  @PostMapping
  @Secured({ RoleConstants.ACTIVIDAD_CREA, RoleConstants.USUARIO_ADMIN })
  public ResponseEntity<?> createActivity(@Valid @RequestBody ActivityRequest activityRequest) {
    Activity activity = activityService.createActivity(activityRequest);

    URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{activityId}").buildAndExpand(activity.getId())
        .toUri();

    return ResponseEntity.created(location).body(new ApiResponse(true, "Actividad creada con éxito!!"));
  }

  @PutMapping
  @Secured({ RoleConstants.ACTIVIDAD_MODIFICA, RoleConstants.USUARIO_ADMIN })
  public ResponseEntity<?> updateActivity(@Valid @RequestBody ActivityRequest activityRequest) {
    activityService.updateActivity(activityRequest);
    return ResponseEntity.ok(new ApiResponse(true, "Actividad actualizada con éxito!!!"));
  }

  @DeleteMapping("/{activityId}")
  @Secured({ RoleConstants.ACTIVIDAD_ELIMINA, RoleConstants.USUARIO_ADMIN })
  public ResponseEntity<?> deleteActivity(@PathVariable Long activityId) {
    activityService.deleteActivity(activityId);
    return ResponseEntity.ok(new ApiResponse(true, "Actividad eliminada con éxito!!!"));
  }

  @GetMapping("status/{status}")
  @Secured({ RoleConstants.ACTIVIDAD_LECTURA, RoleConstants.EXPEDIENTE_ACTIVIDAD_LISTADO, RoleConstants.USUARIO_ADMIN })
  public List<ShareCatResponse> getActivityRequestByStatus(@PathVariable StatusName status) {
    return activityService.getActivitiesByStatus(status);
  }
}