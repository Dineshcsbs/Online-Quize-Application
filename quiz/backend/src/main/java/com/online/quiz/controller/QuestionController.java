package com.online.quiz.controller;

import com.online.quiz.dto.AnswerDTO;
import com.online.quiz.dto.QuestionDTO;
import com.online.quiz.dto.ResponseDTO;
import com.online.quiz.entity.Question;
import com.online.quiz.service.QuestionService;
import com.online.quiz.uitl.Constant;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class QuestionController {
    private final QuestionService questionService;

    @PostMapping("/question")
    public ResponseDTO createQuestion(@RequestBody final Question question){
        return ResponseDTO.builder().message(Constant.CREATE)
                .data(this.questionService.createQuestion(question))
                .statusCode(HttpStatus.CREATED.value()).build();
    }

    @GetMapping("/retrieve-question")
    public ResponseDTO getAllQuestion(){
        return ResponseDTO.builder().message(Constant.RETRIEVE)
                .data(this.questionService.getAllQuestion())
                .statusCode(HttpStatus.FOUND.value()).build();
    }

    @GetMapping("/question")
    public ResponseDTO retriveQuestion(){
        return ResponseDTO.builder().message(Constant.RETRIEVE)
                .data(this.questionService.retriveQuestion())
                .statusCode(HttpStatus.FOUND.value()).build();
    }

    @GetMapping("/question-id/{id}")
    public ResponseDTO retriveById(@PathVariable final String id){
        return ResponseDTO.builder().message(Constant.RETRIEVE)
                .data(this.questionService.getQuestion(id))
                .statusCode(HttpStatus.FOUND.value()).build();
    }

    @GetMapping("/answer/{id}")
    public ResponseDTO getAnswer(@PathVariable final String id){
        return ResponseDTO.builder().message(Constant.RETRIEVE)
                .data(this.questionService.retriveAnswer(id))
                .statusCode(HttpStatus.FOUND.value()).build();
    }

//    @GetMapping("/question-set/{id}")
//    public List<QuestionDTO> retriveQuestionSet(@PathVariable final String id){
//        return this.questionService.getQuestionSet(id);
//    }

    @PutMapping("/question")
    public ResponseDTO updateQuestion(@PathVariable final String id,@RequestBody final Question question){
        return ResponseDTO.builder().message(Constant.UPDATED)
                .data(this.questionService.updateQuestion(id,question))
                .statusCode(HttpStatus.FOUND.value()).build();
    }

    @DeleteMapping("/question")
    public ResponseDTO deleteQuestion(@PathVariable final String id){
        return ResponseDTO.builder().message(Constant.DELETE)
                .data(this.questionService.deleteQuestion(id))
                .statusCode(HttpStatus.FOUND.value()).build();
    }
}
