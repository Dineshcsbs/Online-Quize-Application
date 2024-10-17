package com.online.quiz.service;

import com.online.quiz.entity.UserCredential;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;


public class UserDetail implements UserDetails {

    private final String username;
    private final String password;
    private final UserCredential userCredential;

    public UserDetail(UserCredential userCredential) {
        this.username = userCredential.getEmail();
        this.password = userCredential.getPassword();
        this.userCredential = userCredential;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(() -> userCredential.getAuthority().name());
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
