package com.online.quiz.controller;

import com.online.quiz.dto.ResponseDTO;
import com.online.quiz.entity.Test;
import com.online.quiz.service.TestService;
import com.online.quiz.uitl.Constant;
import lombok.AllArgsConstructor;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class TestController {

    private final TestService testService;

    @PostMapping("/test/{id}")
    public ResponseDTO createTest(@PathVariable final String id) {
        return ResponseDTO.builder().message(Constant.CREATE)
                .data(this.testService.createTest(id))
                .statusCode(HttpStatus.CREATED.value()).build();
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
    public ResponseDTO testById(@PathVariable final String id) {
        return ResponseDTO.builder().message(Constant.RETRIEVE)
                .data(this.testService.getTestById(id))
                .statusCode(HttpStatus.CREATED.value()).build();
    }

    @GetMapping("/test-completed")
    public ResponseDTO activeTest() {
        return ResponseDTO.builder().message(Constant.RETRIEVE)
                .data(this.testService.getAllCompletedTest())
                .statusCode(HttpStatus.CREATED.value()).build();
    }

    @GetMapping("/practice")
    public ResponseDTO practiceTest(){
        return ResponseDTO.builder().message(Constant.RETRIEVE)
                .data(this.testService.getPracticeTest())
                .statusCode(HttpStatus.CREATED.value()).build();
    }

//    @GetMapping("/practice-question/{id}")
//    public List<QuestionDTO> practiceTestQuestion(@PathVariable final String id){
//        return this.testService.getPracticeTestQuestion(id);
//    }

    @GetMapping("/test-set-question/{id}")
    public ResponseDTO retriveQuestionSet(@PathVariable final String id){
        return ResponseDTO.builder().message(Constant.RETRIEVE)
                .data(this.testService.retriveQuestionSet(id))
                .statusCode(HttpStatus.CREATED.value()).build();
    }

    @PutMapping("/test/{id}")
    public ResponseDTO updatedTest(@PathVariable final String id, @RequestBody final Test test) {
        return ResponseDTO.builder().message(Constant.UPDATED)
                .data(this.testService.updateTest(id, test))
                .statusCode(HttpStatus.CREATED.value()).build();
    }

    @GetMapping("/test-user")
    public ResponseDTO getAllTest(){
        return ResponseDTO.builder().message(Constant.RETRIEVE)
                .data(this.testService.getTestUser())
                .statusCode(HttpStatus.CREATED.value()).build();
    }

    @GetMapping("/active-test")
    public ResponseDTO getPendingTest(){
        return ResponseDTO.builder().message(Constant.CREATE)
                .data(this.testService.getPendingTest())
                .statusCode(HttpStatus.CREATED.value()).build();
    }
//    @GetMapping("/active-test-search")
//    public Page<Test> getPendingTest(@RequestParam(defaultValue = "0") final int pageNo){
//        System.err.println(pageNo);
//        return this.testService.getPendingSearchTest(pageNo,4,"id",Sort.Direction.ASC);
//    }

    @GetMapping("/search-assignment")
    public ResponseDTO getactiveTest(@RequestParam(required = false) String search,
                                    @RequestParam(defaultValue = "0") final int pageNo,
                                    @RequestParam(defaultValue = "4") final int pageSize,
                                    @RequestParam(defaultValue = "id") final String fieldName,
                                    @RequestParam(defaultValue = "ASC") final Sort.Direction direction){
        return ResponseDTO.builder().message(Constant.RETRIEVE)
                .data(this.testService.getSearchAssignment(search, pageNo, pageSize, fieldName, direction))
                .statusCode(HttpStatus.CREATED.value()).build();
    }

    @GetMapping("/search-completed-test")
    public ResponseDTO getCompletedTest(@RequestParam(required = false) String search,
                                       @RequestParam(defaultValue = "0") final int pageNo,
                                       @RequestParam(defaultValue = "4") final int pageSize,
                                       @RequestParam(defaultValue = "id") final String fieldName,
                                       @RequestParam(defaultValue = "ASC") final Sort.Direction direction) {
        return ResponseDTO.builder().message(Constant.RETRIEVE)
                .data(this.testService.getCompletedTestSearch(search, pageNo, pageSize, fieldName, direction))
                .statusCode(HttpStatus.CREATED.value()).build();
    }

    @GetMapping("/search-practice-test")
    public ResponseDTO getPracticeSearch(@RequestParam(required = false) String search,
                                        @RequestParam(defaultValue = "0") final int pageNo,
                                        @RequestParam(defaultValue = "4") final int pageSize,
                                        @RequestParam(defaultValue = "id") final String fieldName,
                                        @RequestParam(defaultValue = "ASC") final Sort.Direction direction){
        return ResponseDTO.builder().message(Constant.RETRIEVE)
                .data(this.testService.getPracticeTestSearch(search, pageNo, pageSize, fieldName, direction))
                .statusCode(HttpStatus.CREATED.value()).build();
    }

    @GetMapping("/average-mark")
    public ResponseDTO averageMark(){
        return ResponseDTO.builder().message(Constant.RETRIEVE)
                .data(this.testService.getAverageMark())
                .statusCode(HttpStatus.CREATED.value()).build();
    }

    @DeleteMapping("/test/{id}")
    public ResponseDTO deleteTest(@PathVariable final String id) {
        return ResponseDTO.builder().message(Constant.DELETE)
                .data(this.testService.deleteTest(id))
                .statusCode(HttpStatus.CREATED.value()).build();
    }

    @PostMapping("/mark/{id}")
    public ResponseDTO getTestService(@PathVariable final String id, @RequestBody final Map<String, String> answerDTO) {
        return ResponseDTO.builder().message(Constant.CREATE)
                .data(this.testService.answer(id,answerDTO))
                .statusCode(HttpStatus.CREATED.value()).build();
    }
}
