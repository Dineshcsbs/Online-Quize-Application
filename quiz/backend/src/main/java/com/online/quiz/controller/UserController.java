package com.online.quiz.controller;

import com.online.quiz.dto.ResponseDTO;
import com.online.quiz.dto.UpdateUserDTO;
import com.online.quiz.service.UserService;
import com.online.quiz.uitl.Constant;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1")
public class UserController {

    private final  UserService userService;
    UserController(final UserService userService){
        this.userService=userService;
    }

    @GetMapping("/all-user-info")
    public ResponseDTO getUserInfo(@RequestParam(required = false) String search,
                                   @RequestParam(defaultValue = "0") final int pageNo,
                                   @RequestParam(defaultValue = "10") final int pageSize,
                                   @RequestParam(defaultValue = "id") final String fieldName,
                                   @RequestParam(defaultValue = "ASC") final Sort.Direction direction){
        return ResponseDTO.builder().message(Constant.RETRIEVE)
                .data(this.userService.getAllUser(search, pageNo, pageSize, fieldName, direction))
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
