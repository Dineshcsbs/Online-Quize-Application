//package com.online.quiz.controller;
//
//import com.online.quiz.entity.Authority;
//import com.online.quiz.service.AuthorityService;
//import lombok.AllArgsConstructor;
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//
//
//@RestController
//@RequestMapping("api/v1")
//@AllArgsConstructor
//public class AuthorityController {
//
//    private final AuthorityService authorityService;
//    @PostMapping("/authority")
//    public Authority createRoll(@RequestBody final Authority authority){
//        return authorityService.createAuthority(authority);
//    }
//}
