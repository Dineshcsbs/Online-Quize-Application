package com.online.quiz.controller;

import com.online.quiz.dto.ResponseDTO;
import com.online.quiz.dto.SignInRequestDTO;
import com.online.quiz.dto.SignUpRequestDTO;
import com.online.quiz.entity.UserCredential;
import com.online.quiz.service.UserCredentialService;
import com.online.quiz.uitl.Constant;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class UserCredentialController {

    private final UserCredentialService userCredentialService;

    @PostMapping("/register")
    public ResponseDTO createUser(@RequestBody final SignUpRequestDTO signUpRequestDTO) {
        return ResponseDTO.builder().message(Constant.CREATE)
                .data(this.userCredentialService.createCredential(signUpRequestDTO))
                .statusCode(HttpStatus.CREATED.value()).build();
    }

    @PostMapping("/login")
    public ResponseDTO generateToken(@RequestBody final SignInRequestDTO signInRequestDTO){
        return ResponseDTO.builder()
                .statusCode(HttpStatus.CREATED.value())
                .data(this.userCredentialService.generateToken(signInRequestDTO))
                .message(Constant.CREATE)
                .build();
    }

    @GetMapping("/user-info")
    public ResponseDTO getUserInfo(){
        return ResponseDTO.builder().message(Constant.RETRIEVE)
                .data(this.userCredentialService.getUserDetail())
                .statusCode(HttpStatus.FOUND.value()).build();
    }

//    @DeleteMapping("/user/{id}")
//    public String deleteUser(@PathVariable final String id) {
//        return this.userCredentialService.deleteUser(id);
//    }
}
