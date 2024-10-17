package com.online.quiz.controller;

import com.online.quiz.dto.AnswerDTO;
import com.online.quiz.dto.QuestionDTO;
import com.online.quiz.entity.Question;
import com.online.quiz.service.QuestionService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class QuestionController {
    private final QuestionService questionService;

    @PostMapping("/question")
    public Question createQuestion(@RequestBody final Question question){
        return this.questionService.createQuestion(question);
    }

    @GetMapping("/retrieve-question")
    public List<Question> getAllQuestion(){
        return this.questionService.getAllQuestion();
    }

    @GetMapping("/question")
    public QuestionDTO retriveQuestion(){
        return this.questionService.retriveQuestion();
    }

    @GetMapping("/question-id/{id}")
    public Question retriveById(@PathVariable final String id){
        return this.questionService.getQuestion(id);
    }

    @GetMapping("/answer/{id}")
    public List<AnswerDTO> getAnswer(@PathVariable final String id){
        return this.questionService.retriveAnswer(id);
    }

//    @GetMapping("/question-set/{id}")
//    public List<QuestionDTO> retriveQuestionSet(@PathVariable final String id){
//        return this.questionService.getQuestionSet(id);
//    }

    @PutMapping("/question")
    public Question updateQuestion(@PathVariable final String id,@RequestBody final Question question){
        return this.questionService.updateQuestion(id,question);
    }

    @DeleteMapping("/question")
    public String deleteQuestion(@PathVariable final String id){
        return this.questionService.deleteQuestion(id);
    }
}
