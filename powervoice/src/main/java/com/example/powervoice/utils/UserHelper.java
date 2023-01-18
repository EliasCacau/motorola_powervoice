package com.example.powervoice.utils;

import com.example.powervoice.model.User;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class UserHelper {

  public static User getAuthenticatedUser(){
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    return (User) authentication.getPrincipal();
  }

  public static Set<String> getRolesUser(){
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    Set<String> roles = authentication.getAuthorities().stream().map(r -> r.getAuthority()).collect(Collectors.toSet());
    return roles;
  }
}
