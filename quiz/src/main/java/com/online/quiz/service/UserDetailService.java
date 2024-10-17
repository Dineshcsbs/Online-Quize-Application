package com.online.quiz.service;

import com.online.quiz.entity.UserCredential;
import com.online.quiz.repository.UserCredentialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserDetailService implements UserDetailsService {

    @Autowired
    private UserCredentialRepository userCredentialRepository;

    public UserDetailService() {
    }

    @Override
    public UserDetails loadUserByUsername(final String email) throws UsernameNotFoundException {
        Optional<UserCredential> credential = this.userCredentialRepository.findByEmail(email);
        return credential.map(UserDetail::new).orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }
}
