package com.online.quiz.service;

import com.online.quiz.dto.SignInRequestDTO;
import com.online.quiz.dto.SignUpRequestDTO;
import com.online.quiz.entity.UserCredential;
import com.online.quiz.repository.UserCredentialRepository;
import com.online.quiz.uitl.Authority;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserCredentialService {

    private final UserCredentialRepository userCredentialRepository;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final AdminService adminService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;


    public UserCredential createCredential(final SignUpRequestDTO signUpRequestDTO) {
        if(userCredentialRepository.findByEmail(signUpRequestDTO.getEmail()).isEmpty()) {

            UserCredential userCredential = UserCredential.builder()
                    .email(signUpRequestDTO.getEmail())
                    .password(passwordEncoder.encode(signUpRequestDTO.getPassword()))
                    .name(signUpRequestDTO.getName())
                    .authority(signUpRequestDTO.getAuthority() ? Authority.ADMIN : Authority.USER)
                    .isRemoved(false)
                    .isActive(true)
                    .build();
            userCredential = this.userCredentialRepository.save(userCredential);
            if (signUpRequestDTO.getAuthority()) {
                adminService.createAdmin(signUpRequestDTO, userCredential);
            } else {
                userService.createUser(signUpRequestDTO, userCredential);
            }
            return userCredential;
        }
        else{
            throw new RuntimeException("user already exists");
        }
    }

    public String deleteUser(final String id) {
        return userCredentialRepository.findById(id).map(userCredential -> {
                    userCredential.setIsRemoved(true);
                    this.userCredentialRepository.save(userCredential);
                    return "User Removed Successfully";
                })
                .orElseThrow();
    }

    public String generateToken(final SignInRequestDTO signInRequestDTO) {
        final Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signInRequestDTO.getEmail(), signInRequestDTO.getPassword()));
        if (authentication.isAuthenticated()) {
            UserCredential userCredential = this.userCredentialRepository.findByEmail(signInRequestDTO.getEmail())
                    .orElseThrow();
            if (userCredential.getAuthority().equals("ADMIN")) {
            } else {
            }
            String userId = userCredential.getId();
            String role = userCredential.getAuthority().name();
            return this.jwtService.generateToken(signInRequestDTO.getEmail(),userId,role);
        }
        else{
//            throw new
            return "User Name or password is in valid";
        }

    }
}
