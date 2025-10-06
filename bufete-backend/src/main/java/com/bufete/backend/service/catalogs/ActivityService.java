package com.bufete.backend.service.catalogs;

import java.util.List;
import java.util.stream.Collectors;

import com.bufete.backend.exception.ResourceNotFoundException;
import com.bufete.backend.model.catalogs.Activity;
import com.bufete.backend.model.catalogs.ActivityView;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.catalogs.ActivityRequest;
import com.bufete.backend.payload.shared.ShareCatResponse;
import com.bufete.backend.repository.catalogs.ActivityRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActivityService {

  @Autowired
  private ActivityRepository activityRepository;

  public List<ActivityView> getActivityList(String param) {
    if (param.equals("active")) {
      return activityRepository.findAllView()
        .stream().filter(act -> act.getStatus().equals(StatusName.ACTIVO))
        .collect(Collectors.toList());
    }
    return activityRepository.findAllView();
  }
  
  public Activity createActivity(ActivityRequest activityRequest) {
    Activity activity = new Activity(activityRequest.getName(), StatusName.ACTIVO);
    return activityRepository.save(activity);
  }

  public ActivityRequest getActivityById(Long activityId) {
    Activity activity = activityRepository.findById(activityId)
        .orElseThrow(() -> new ResourceNotFoundException("Activity", "id", activityId));
    ActivityRequest request = new ActivityRequest();
    request.setId(activity.getId());
    request.setName(activity.getName());
    request.setStatus(activity.getStatus());
    return request;
  }

  public void updateActivity(ActivityRequest activityRequest) {
    Activity activity = activityRepository.findById(activityRequest.getId())
        .orElseThrow(() -> new ResourceNotFoundException("Activity", "id", activityRequest.getId()));
    activity.setName(activityRequest.getName());
    activity.setStatus(activityRequest.getStatus());
    activityRepository.save(activity);
  }

  public void deleteActivity(Long activityId) {
    Activity activity = activityRepository.findById(activityId)
        .orElseThrow(() -> new ResourceNotFoundException("Activity", "id", activityId));
    activity.setStatus(StatusName.DELETED);
    activityRepository.save(activity);
  }

  public List<ShareCatResponse> getActivitiesByStatus(StatusName status) {
    return activityRepository
            .findActivitiesByStatus(status)
            .stream()
            .map(activity -> new ShareCatResponse(activity.getId(), activity.getName()))
    .collect(Collectors.toList());
  }
}