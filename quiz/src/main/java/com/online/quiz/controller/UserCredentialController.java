package com.online.quiz.controller;

import com.online.quiz.dto.ResponseDTO;
import com.online.quiz.dto.SignInRequestDTO;
import com.online.quiz.dto.SignUpRequestDTO;
import com.online.quiz.entity.UserCredential;
import com.online.quiz.service.UserCredentialService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class UserCredentialController {

    private final UserCredentialService userCredentialService;

    @PostMapping("/register")
    public UserCredential createUser(@RequestBody final SignUpRequestDTO signUpRequestDTO) {
        return this.userCredentialService.createCredential(signUpRequestDTO);
    }

    @PostMapping("/login")
    public ResponseDTO generateToken(@RequestBody final SignInRequestDTO signInRequestDTO){
        return ResponseDTO.builder()
                .status(200)
                .data(this.userCredentialService.generateToken(signInRequestDTO))
                .message("success")
                .build();
    }

//    @DeleteMapping("/user/{id}")
//    public String deleteUser(@PathVariable final String id) {
//        return this.userCredentialService.deleteUser(id);
//    }
}
