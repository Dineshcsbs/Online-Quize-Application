package com.online.quiz.controller;

import com.online.quiz.dto.ResponseDTO;
import com.online.quiz.dto.UpdateUserDTO;
import com.online.quiz.entity.User;
import com.online.quiz.service.UserService;
import com.online.quiz.uitl.Constant;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
//@RequestMapping("/api/v1")
//@AllArgsConstructor
public class UserController {

    private final  UserService userService;
    UserController(final UserService userService){
        this.userService=userService;
    }

    @GetMapping("/api/v1/user-info")
    public ResponseDTO getUserInfo(){
        return ResponseDTO.builder().message(Constant.RETRIEVE)
                .data(this.userService.getUserDetail())
                .statusCode(HttpStatus.FOUND.value()).build();
    }

    @PutMapping("/update")
    public ResponseDTO updateUserInfo(@ModelAttribute UpdateUserDTO updateUserDTO) throws IOException {
        return ResponseDTO.builder().message(Constant.RETRIEVE)
                .data(this.userService.updateUser(updateUserDTO))
                .statusCode(HttpStatus.FOUND.value()).build();

    }

//    @PutMapping("/update")
//    public User updateUser(@RequestParam("image") MultipartFile image ) throws IOException {
//        return this.userService.updateUser(UpdateUserDTO.builder().image(image.getBytes()).build());
//    }
}
