package com.online.quiz.controller;

//import com.online.quiz.dto.AnswerDTO;
import com.online.quiz.dto.QuestionDTO;
import com.online.quiz.dto.ResponseMarkResult;
import com.online.quiz.entity.Question;
import com.online.quiz.entity.Test;
import com.online.quiz.service.TestService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class TestController {

    private final TestService testService;

    @PostMapping("/test/{id}")
    public Test createTest(@PathVariable final String id) {
        return this.testService.createTest(id);
    }
//    @PostMapping("/test")
//    public Test createTest(@RequestBody final Test test) {
//        return this.testService.createTest(test);
//    }

//    @GetMapping("/test-active")
//    public List<Test> getAllActiveTest() {
//        return this.testService.getAllActiveTest();
//    }

    @GetMapping("/test/{id}")
    public Test testById(@PathVariable final String id) {
        return this.testService.getTestById(id);
    }

    @GetMapping("/test-completed")
    public List<Test> activeTest() {
        return this.testService.getAllCompletedTest();
    }

    @GetMapping("/practice")
    public List<Test> practiceTest(){
        return this.testService.getPracticeTest();
    }

//    @GetMapping("/practice-question/{id}")
//    public List<QuestionDTO> practiceTestQuestion(@PathVariable final String id){
//        return this.testService.getPracticeTestQuestion(id);
//    }

    @GetMapping("/test-set-question/{id}")
    public List<QuestionDTO> retriveQuestionSet(@PathVariable final String id){
        return this.testService.retriveQuestionSet(id);
    }

    @PutMapping("/test/{id}")
    public Test updatedTest(@PathVariable final String id, @RequestBody final Test test) {
        return this.testService.updateTest(id, test);
    }

    @GetMapping("/test-user")
    public List<Test> getAllTest(){
        return this.testService.getTestUser();
    }

    @GetMapping("/active-test")
    public List<Test> getPendingTest(){
        return this.testService.getPendingTest();
    }

    @GetMapping("/average-mark")
    public Float averageMark(){
        return  this.testService.getAverageMark();
    }

    @DeleteMapping("/test/{id}")
    public String deleteTest(@PathVariable final String id) {
        return this.testService.deleteTest(id);
    }

    //mark calculate
    @PostMapping("/mark/{id}")
    public ResponseMarkResult getTestService(@PathVariable final String id, @RequestBody final Map<String, String> answerDTO) {
        return this.testService.answer(id,answerDTO);
    }
}
