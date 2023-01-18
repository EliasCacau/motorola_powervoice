package com.example.powervoice.config;

import com.example.powervoice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Autowired
    private UserService userService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.httpBasic();
        http.cors();

        http.authorizeRequests()
            .antMatchers("/login/",
            "/usuario/cadastro", "/category/get/all",
            "/product/get/all","/usuario/get/all","/usuario/check-email/**","/usuario/check-username/**", "/reaction/get/likeamount/**",
            "/location/**","/feature/get/**","/feature/filter/", "/product/get/id/**","/redefine/user/**/code/**","/redefine/email/**").permitAll();
        http.authorizeRequests().antMatchers("/usuario/admin/cadastro",
            "/usuario/edit/**", "/usuario/delete/**","/category/create","/product/create",
            "/product/edit/**","/product/delete/**","/category/edit/**", "/category/delete/**",
            "/reportCategory/create", "/reportCategory/edit/**", "/reportCategory/delete/**",
            "/report/edit", "/report/delete/**","/redefine/delete/**")
            .hasRole("ADMIN");

        http.authorizeRequests().antMatchers("/usuario/user/cadastro","/usuario/edit/**","/reportCategory/create").hasAnyRole("USER", "ADMIN");  

        http.authorizeRequests().anyRequest().authenticated();
        http.logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout"));
        http.logout().logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK));
        http.csrf().disable();
        return http.build();
    }

    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authProvider());
    }

    @Bean
    public AuthenticationProvider authProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(this.userService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }




}