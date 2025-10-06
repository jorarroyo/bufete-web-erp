package com.bufete.backend.security;

import java.util.List;
import java.util.stream.Collectors;

import com.bufete.backend.model.appConfig.AppOption;
import com.bufete.backend.model.appConfig.User;
import com.bufete.backend.repository.appConfig.RoleAppOptionRepository;
import com.bufete.backend.repository.appConfig.RoleAssignRepository;
import com.bufete.backend.repository.appConfig.UserRepository;

import org.hibernate.cfg.NotYetImplementedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

        @Autowired
        UserRepository userRepository;

        @Autowired
        RoleAssignRepository roleAssignRepository;

        @Autowired
        RoleAppOptionRepository roleAppOptionRepository;

        @Override
        @Transactional
        public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
                // Let people login with either username or email
                // User user = userRepository.findByUsernameOrEmailActive(usernameOrEmail,
                // usernameOrEmail) // findByUsernameOrEmail(usernameOrEmail,
                // // usernameOrEmail)
                // .orElseThrow(() -> new UsernameNotFoundException(
                // "User not found with username or email : " + usernameOrEmail));

                // return UserPrincipal.create(user);
                throw new NotYetImplementedException();
        }

        // This method is used by JWTAuthenticationFilter
        @Transactional
        public UserDetails loadUserById(Long id, Long companyId) {
                User user = userRepository.findById(id)
                                .orElseThrow(() -> new UsernameNotFoundException("User not found with id : " + id));
                List<Long> roles = roleAssignRepository.getRolesIdByUserIdAndCompanyId(id, companyId);
                List<AppOption> options = roleAppOptionRepository.getAppOptionByRoleIds(roles);
                List<GrantedAuthority> authorities = options.stream()
                                .map(option -> new SimpleGrantedAuthority("ROLE_" + option.getName().toUpperCase()))
                                .collect(Collectors.toList());
                UserPrincipal principal = new UserPrincipal(user.getId(), user.getName(), user.getUsername(),
                                user.getEmail(), user.getPassword(), companyId, authorities, user.getEmployeeId());
                return principal;
        }

        @Transactional
        public UserDetails loadUserByUserNameAndCompanyId(String usernameOrEmail, Long companyId)
                        throws UsernameNotFoundException {
                User user = userRepository.findByUsernameOrEmailActive(usernameOrEmail, usernameOrEmail)
                                .orElseThrow(() -> new UsernameNotFoundException(
                                                "User not found with username or email : " + usernameOrEmail));
                return loadUserById(user.getId(), companyId);
        }
}
