package com.bufete.backend.util;

import com.bufete.backend.exception.BadRequestException;

public class Validators {

  public static void validatePageNumberAndSize(int page, int size) {
    if (page < 0) {
      throw new BadRequestException("Page number cannot be less than zero");
    }

    if (size > AppConstants.MAX_PAGE_SIZE) {
      throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
    }
  }

  public static String toCamelCase(String s) {
    String[] parts = s.split("_");
    if (parts.length == 1)
      return parts[0];
    String camelCaseString = "";
    for (String part : parts) {
      if (camelCaseString.isEmpty()) {
        camelCaseString = part;
      } else {
        camelCaseString = camelCaseString + toProperCase(part);
      }
    }
    return camelCaseString;
  }

  public static String toProperCase(String s) {
    return s.substring(0, 1).toUpperCase() + s.substring(1).toLowerCase();
  }

}