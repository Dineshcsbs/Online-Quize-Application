package com.online.quiz.controller;

import com.online.quiz.dto.QuestionSetDTO;
import com.online.quiz.dto.ResponseDTO;
import com.online.quiz.entity.QuestionSet;
import com.online.quiz.entity.User;
import com.online.quiz.service.QuestionSetService;
import com.online.quiz.uitl.Constant;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@AllArgsConstructor
public class QuestionSetController {
    private final QuestionSetService questionSetService;

    @PostMapping("/question-set")
    public ResponseDTO createQuestionSet(@ModelAttribute QuestionSetDTO questionSetDTO) throws IOException {
        System.out.println(questionSetDTO);
        return ResponseDTO.builder().message(Constant.CREATE)
                .data(this.questionSetService.createQuestionSet(questionSetDTO))
                .statusCode(200).build();

    }

    @GetMapping("/question-set")
    public ResponseDTO getAllQuestionSet(){
        return ResponseDTO.builder().message(Constant.RETRIEVE)
                .data(this.questionSetService.getAllQuestionSet())
                .statusCode(HttpStatus.FOUND.value()).build();
    }
    @GetMapping("/question/{id}")
    public ResponseDTO getQuestionSet(@PathVariable final String id){
        return ResponseDTO.builder().message(Constant.RETRIEVE)
                .data(this.questionSetService.getQuestionSet(id))
                .statusCode(HttpStatus.FOUND.value()).build();
    }

//    @GetMapping("/register")
//    public List<QuestionSet> registerTest(){
//        return this.questionSetService.getAllUnRegisterSet();
//    }

    @GetMapping("/question-set-search")
    public ResponseDTO getQuestionSetSearch(@RequestParam(required = false) String search,
                                     @RequestParam(defaultValue = "0") final int pageNo,
                                     @RequestParam(defaultValue = "4") final int pageSize,
                                     @RequestParam(defaultValue = "id") final String fieldName,
                                     @RequestParam(defaultValue = "ASC") final Sort.Direction direction){
        return ResponseDTO.builder().message(Constant.RETRIEVE)
                .data(this.questionSetService.getQuestionSetSearch(search, pageNo, pageSize, fieldName, direction))
                .statusCode(HttpStatus.CREATED.value()).build();
    }

    @GetMapping("/assignment-unregister")
    public ResponseDTO getUnRegisterAssinment(@RequestParam(required = false) String search,
                                                    @RequestParam(defaultValue = "0") final int pageNo,
                                                    @RequestParam(defaultValue = "4") final int pageSize,
                                                    @RequestParam(defaultValue = "id") final String fieldName,
                                                    @RequestParam(defaultValue = "ASC") final Sort.Direction direction){
        return ResponseDTO.builder().message(Constant.RETRIEVE)
                .data(this.questionSetService.getAllUnRegisterSetAssignment(search, pageNo, pageSize, fieldName, direction))
                .statusCode(HttpStatus.FOUND.value()).build();
    }

    @GetMapping("/test-unregister")
    public ResponseDTO getUnRegisterTest(@RequestParam(required = false) String search,
                                                    @RequestParam(defaultValue = "0") final int pageNo,
                                                    @RequestParam(defaultValue = "4") final int pageSize,
                                                    @RequestParam(defaultValue = "id") final String fieldName,
                                                    @RequestParam(defaultValue = "ASC") final Sort.Direction direction){
        return ResponseDTO.builder().message(Constant.RETRIEVE)
                .data(this.questionSetService.getAllUnRegisterSetTest(search, pageNo, pageSize, fieldName, direction))
                .statusCode(HttpStatus.FOUND.value()).build();
    }

    @GetMapping("/available-register")
    public ResponseDTO getAvailableRegister(){
        return ResponseDTO.builder().message(Constant.RETRIEVE)
                .data( this.questionSetService.getAvailableRegister())
                .statusCode(HttpStatus.FOUND.value()).build();
    }

    @PutMapping("/question-set/{id}")
    public ResponseDTO updateQuestionSet(@PathVariable final String id,@RequestBody final QuestionSet questionSet ){
        return ResponseDTO.builder().message(Constant.UPDATED)
                .data(this.questionSetService.updateQuestionSet(id,questionSet))
                .statusCode(HttpStatus.FOUND.value()).build();
    }
    @DeleteMapping("/question-set/{id}")
    public ResponseDTO deleteQuestionSet(@PathVariable final String id){
        return ResponseDTO.builder().message(Constant.DELETE)
                .data(this.questionSetService.deleteQuestionSet(id))
                .statusCode(HttpStatus.FOUND.value()).build();
    }
//    @PutMapping("/updates/{id}")
//    public void updateUser(@RequestParam("image") MultipartFile image , @PathVariable String id) throws IOException {
//         this.questionSetService.sample(image,id);
//    }
}
