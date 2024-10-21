package com.online.quiz.controller;

import com.online.quiz.dto.UpdateUserDTO;
import com.online.quiz.entity.QuestionSet;
import com.online.quiz.entity.User;
import com.online.quiz.service.QuestionSetService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
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

    @PostMapping("/question-set/{subject}")
    public QuestionSet createQuestionSet(@PathVariable String subject) {
        return this.questionSetService.createQuestionSet(subject);
    }

    @GetMapping("/question-set")
    public List<QuestionSet> getAllQuestionSet(){
        return this.questionSetService.getAllQuestionSet();
    }
    @GetMapping("/question/{id}")
    public QuestionSet getQuestionSet(@PathVariable final String id){
        return this.questionSetService.getQuestionSet(id);
    }

//    @GetMapping("/register")
//    public List<QuestionSet> registerTest(){
//        return this.questionSetService.getAllUnRegisterSet();
//    }

    @GetMapping("/assignment-unregister")
    public Page<QuestionSet> getUnRegisterAssinment(@RequestParam(required = false) String search,
                                                    @RequestParam(defaultValue = "0") final int pageNo,
                                                    @RequestParam(defaultValue = "4") final int pageSize,
                                                    @RequestParam(defaultValue = "id") final String fieldName,
                                                    @RequestParam(defaultValue = "ASC") final Sort.Direction direction){
        return this.questionSetService.getAllUnRegisterSetAssignment(search, pageNo, pageSize, fieldName, direction);
    }

    @GetMapping("/test-unregister")
    public Page<QuestionSet> getUnRegisterTest(@RequestParam(required = false) String search,
                                                    @RequestParam(defaultValue = "0") final int pageNo,
                                                    @RequestParam(defaultValue = "4") final int pageSize,
                                                    @RequestParam(defaultValue = "id") final String fieldName,
                                                    @RequestParam(defaultValue = "ASC") final Sort.Direction direction){
        return this.questionSetService.getAllUnRegisterSetTest(search, pageNo, pageSize, fieldName, direction);
    }

    @GetMapping("/available-register")
    public List<List<Integer>> getAvailableRegister(){
        return this.questionSetService.getAvailableRegister();
    }

    @PutMapping("/question-set/{id}")
    public QuestionSet updateQuestionSet(@PathVariable final String id,@RequestBody final QuestionSet questionSet ){
        return this.questionSetService.updateQuestionSet(id,questionSet);
    }
    @DeleteMapping("/question-set/{id}")
    public String deleteQuestionSet(@PathVariable final String id){
        return this.questionSetService.deleteQuestionSet(id);
    }
//    @PutMapping("/updates/{id}")
//    public void updateUser(@RequestParam("image") MultipartFile image , @PathVariable String id) throws IOException {
//         this.questionSetService.sample(image,id);
//    }
}
