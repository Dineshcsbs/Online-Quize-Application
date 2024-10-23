package com.online.quiz.controller;

import com.online.quiz.dto.UpdateUserDTO;
import com.online.quiz.entity.User;
import com.online.quiz.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
//@RequestMapping("/api/v1")
//@AllArgsConstructor
public class UserController {

//    @Autowired
    private final  UserService userService;
    UserController(final UserService userService){
        this.userService=userService;
    }

    @GetMapping("/api/v1/user-info")
    public User getUserInfo(){
        return this.userService.getUserDetail();
    }

    @PutMapping("/update")
    public User updateUserInfo(@ModelAttribute UpdateUserDTO updateUserDTO) throws IOException {

//        if (!image.isEmpty()) {
//            updateUserDTO.setImage(image.getBytes());
//        }
        return this.userService.updateUser(updateUserDTO);

    }

//    @PutMapping("/update")
//    public User updateUser(@RequestParam("image") MultipartFile image ) throws IOException {
//        return this.userService.updateUser(UpdateUserDTO.builder().image(image.getBytes()).build());
//    }
}
