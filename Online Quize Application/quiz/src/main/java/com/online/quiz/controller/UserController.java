package com.online.quiz.controller;

import com.online.quiz.entity.User;
import com.online.quiz.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/user-info")
    public User getUserInfo(){
        return this.userService.getUserDetail();
    }
}
