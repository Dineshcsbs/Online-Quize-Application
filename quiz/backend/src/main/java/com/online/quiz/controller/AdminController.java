package com.online.quiz.controller;

import com.online.quiz.dto.ResponseDTO;
import com.online.quiz.dto.UpdateUserDTO;
import com.online.quiz.service.AdminService;
import com.online.quiz.uitl.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1")
public class AdminController {

    @Autowired
    private  AdminService adminService;

//    public AdminController(AdminService adminService) {
//        this.adminService = adminService;
//    }

//    @GetMapping("/admin-info")
//    public ResponseDTO getAdminInfo(){
//        return ResponseDTO.builder().message(Constant.RETRIEVE)
//                .data(this.adminService.getAdminDetail())
//                .statusCode(HttpStatus.FOUND.value()).build();
//    }

    @PutMapping("/update-admin")
    public ResponseDTO updateAdminInfo(@ModelAttribute UpdateUserDTO updateUserDTO) throws IOException {
        return ResponseDTO.builder().message(Constant.RETRIEVE)
                .data(this.adminService.updateAdmin(updateUserDTO))
                .statusCode(200).build();

    }
}
