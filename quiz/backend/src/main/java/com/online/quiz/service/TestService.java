package com.online.quiz.service;

import com.online.quiz.dto.QuestionDTO;
import com.online.quiz.dto.ResponseMarkResult;
import com.online.quiz.entity.*;
import com.online.quiz.repository.AnswerRepository;
import com.online.quiz.repository.QuestionRepository;
import com.online.quiz.repository.TestRepository;
import com.online.quiz.repository.UserRepository;
import com.online.quiz.uitl.Constant;
import com.online.quiz.uitl.JwtFilter;
import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@AllArgsConstructor
public class TestService {

    private final JwtFilter jwtFilter;
    private final TestRepository testRepository;
    private final QuestionService questionService;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final UserRepository userRepository;

    public Test createTest(final String setId){
        return this.testRepository.save(Test.builder().questionSet(QuestionSet.builder().id(setId).build())
                        .user(userRepository.findByUserCredentialId(jwtFilter.extractUsername().get("sub", String.class)))
                        .isRemoved(false).isActive(false)
                .build());
    }
    public List<Test> getAllActiveTest(){
        return this.testRepository.findAllByIsActiveIsTrueAndIsRemovedIsFalse();
    }

    public List<Test> getAllCompletedTest(){
//        System.err.println(jwtFilter.extractUsername().get("sub", String.class));
        return this.testRepository.findAllByIsActiveTrueAndIsRemovedFalseAndUser_UserCredential_Id(jwtFilter.extractUsername().get("sub", String.class));
    }
    public Test updateTest(final String id,final Test test){
        Optional <Test> test1= Optional.ofNullable(this.testRepository.findByIdAndIsRemovedIsFalse(id));

        return test1.map(testInfo->{
            return testRepository.save(testInfo);
        }).orElseThrow();
    }

    public Test getTestById(final String id) {
        return this.testRepository.findById(id).orElseThrow();
    }

    public List<Test> getAllUnRegisterSet(){
        return this.testRepository.findAllByUser_UserCredential_IdAndIsRemovedIsFalse(jwtFilter.extractUsername().get("sub", String.class));
    }

    public String deleteTest(final String id){
        this.testRepository.deleteById(id);
        return Constant.DELETE;
    }

    public ResponseMarkResult answer(final String id, final Map<String, String> answerDTO) {
//        System.err.println(id);
        Test testIsPresent=testRepository.findById(id).orElseThrow();
        if(!testIsPresent.getQuestionSet().getIsPractice()){
            answerRepository.save(Answer.builder().userAnswer(answerDTO.toString())
                    .userCredential(UserCredential.builder().id(jwtFilter.extractUsername().get("sub", String.class)).build())
                    .questionSet(testRepository.findById(id).orElseThrow().getQuestionSet()).build());
        }

//        answerRepository.save(Answer.builder().userAnswer(jwtFilter.extractUsername().get("sub", String.class)).userAnswer(answerDTO.toString()).test(Test.builder().id(id).build()).build());
        List<Question> questions = this.questionRepository.findAllByQuestionSet_Id(testIsPresent.getQuestionSet().getId());
        AtomicInteger mark = new AtomicInteger();

        questions.forEach(question -> {
            if (question.getAnswer().equals(answerDTO.get(question.getId()))) {
                mark.incrementAndGet();
            }
        });
        if(!testIsPresent.getQuestionSet().getIsPractice()) {
            Test test=this.testRepository.findById(id).orElseThrow();
            test.setMark((float)(mark.get()*100/ questions.size()));
            test.setIsActive(true);
            testRepository.save(test);
        }


        return ResponseMarkResult.builder()
                .mark(mark.get()).mark(mark.get()*2)
                .totalQuestion(questions.size())
                .passMark((questions.size()*2)/2)
                .wrongAnswerPer((float)((questions.size()-mark.get())*100/ questions.size()))
                .correctAnswerPer((float)(mark.get()*100/ questions.size()))
                .correctAnswer(mark.get())
                .build();
    }


    public List<Test> getTestUser() {
        return this.testRepository.findAllByUser_UserCredential_IdAndIsActiveIsTrue(jwtFilter.extractUsername().get("sub", String.class));
    }

    public List<Test> getPendingTest() {
        return this.testRepository.findAllByUser_UserCredential_IdAndQuestionSet_IsPracticeIsFalseAndIsActiveIsFalse(jwtFilter.extractUsername().get("sub", String.class));
    }
    public Page<Test> getPendingSearchTest(final int pageNo, final int pageSize, final String fieldName, final Sort.Direction direction) {
        Pageable pageable =  PageRequest.of(pageNo, pageSize, Sort.by(direction, fieldName));
        return this.testRepository.findAllByUser_UserCredential_IdAndQuestionSet_IsPracticeIsFalseAndIsActiveIsFalse(jwtFilter.extractUsername().get("sub", String.class),pageable);
    }

    public List<QuestionDTO> retriveQuestionSet(final String id) {
        return questionService.getQuestionSet(this.testRepository.findById(id).orElseThrow().getQuestionSet().getId());
    }


    public Float getAverageMark() {
        List<Test> test=this.testRepository.findAllByUser_UserCredential_Id(jwtFilter.extractUsername().get("sub", String.class));
        if( test.isEmpty()) return 0.0F;
        Float totalMark=0F;
        for(Test tests:test){
            if(tests.getMark()!=null)totalMark+=tests.getMark();
        }
        return totalMark/ test.size();
    }

    public List<QuestionDTO> getPracticeTestQuestion(final String id) {
        Test test=this.testRepository.findAllByUser_UserCredential_IdAndQuestionSet_IsPracticeIsTrueAndIsActiveIsFalseAndQuestionSet_Id(jwtFilter.extractUsername().get("sub", String.class),id);
        return questionService.getQuestionSet(test.getQuestionSet().getId());
    }

    public List<Test> getPracticeTest() {
        return this.testRepository.findAllByUser_UserCredential_IdAndQuestionSet_IsPracticeIsTrueAndIsActiveIsFalse(jwtFilter.extractUsername().get("sub", String.class));
    }

    public Page<Test> getSearchAssignment(final String search, final int pageNo, final int pageSize, final String fieldName, final Sort.Direction direction) {
        Pageable pageable =  PageRequest.of(pageNo, pageSize, Sort.by(direction, fieldName));
        return this.testRepository.findAllByUserCredentialIdAndSubject(jwtFilter.extractUsername().get("sub", String.class), search,pageable);
    }

    public Page<Test> getCompletedTestSearch(final String search, final int pageNo, final int pageSize, final String fieldName, final Sort.Direction direction) {
        Pageable pageable =  PageRequest.of(pageNo, pageSize, Sort.by(direction, fieldName));
        return this.testRepository.findAllByUserCredentialIdAndSubjectCompleted(
                jwtFilter.extractUsername().get("sub", String.class),
                search,
                pageable
        );
    }



    public Page<Test> getPracticeTestSearch(final String search, final int pageNo, final int pageSize, final String fieldName, final Sort.Direction direction) {
        Pageable pageable =  PageRequest.of(pageNo, pageSize, Sort.by(direction, fieldName));
        return this.testRepository.findAllByUserCredentialIdAndSubjectPractice(jwtFilter.extractUsername().get("sub", String.class),
                search,
                pageable);

    }

    public List<Test> getAllUserRegisterTest() {
        return this.testRepository.findAllByUser_UserCredential_Id(jwtFilter.extractUsername().get("sub", String.class));
    }
}
