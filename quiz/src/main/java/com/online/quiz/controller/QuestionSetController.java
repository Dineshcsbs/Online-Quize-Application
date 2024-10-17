package com.online.quiz.controller;

import com.online.quiz.entity.QuestionSet;
import com.online.quiz.service.QuestionSetService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/register")
    public List<QuestionSet> registerTest(){
        return this.questionSetService.getAllUnRegisterSet();
    }

    @PutMapping("/question-set/{id}")
    public QuestionSet updateQuestionSet(@PathVariable final String id,@RequestBody final QuestionSet questionSet ){
        return this.questionSetService.updateQuestionSet(id,questionSet);
    }
    @DeleteMapping("/question-set/{id}")
    public String deleteQuestionSet(@PathVariable final String id){
        return this.questionSetService.deleteQuestionSet(id);
    }
}
