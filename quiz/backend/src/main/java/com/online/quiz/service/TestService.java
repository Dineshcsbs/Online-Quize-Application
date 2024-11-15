package com.online.quiz.service;

import com.online.quiz.dto.QuestionDTO;
import com.online.quiz.dto.ResponseMarkResultDTO;
import com.online.quiz.dto.RetrieveUserInfoDTO;
import com.online.quiz.entity.*;
import com.online.quiz.exception.BadRequestServiceAlertException;
import com.online.quiz.repository.AnswerRepository;
import com.online.quiz.repository.QuestionRepository;
import com.online.quiz.repository.TestRepository;
import com.online.quiz.repository.UserRepository;
import com.online.quiz.uitl.Constant;
import com.online.quiz.uitl.JwtFilter;

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
public class TestService {


    private final TestRepository testRepository;
    private final QuestionService questionService;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final UserRepository userRepository;


    public TestService(TestRepository testRepository, QuestionService questionService, QuestionRepository questionRepository, AnswerRepository answerRepository, UserRepository userRepository) {
        this.testRepository = testRepository;
        this.questionService = questionService;
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
        this.userRepository = userRepository;

    }

    public Test createTest(final String setId,final String id){
        return this.testRepository.save(Test.builder().questionSet(QuestionSet.builder().id(setId).build())
                        .users(userRepository.findByUserCredentialId(id))
                        .isRemoved(false).isActive(false)
                .build());
    }
    public List<Test> getAllActiveTest(){
        return this.testRepository.findAllByIsActiveIsTrueAndIsRemovedIsFalse();
    }

    public Integer getAllCompletedTest(final String id){
//        System.err.println(jwtFilter.extractUsername().get("sub", String.class));
        return this.testRepository.findAllByIsActiveTrueAndIsRemovedFalseAndUsers_UserCredential_Id(id).size();
    }
    public Test updateTest(final String id,final Test test){
        Optional <Test> test1= Optional.ofNullable(this.testRepository.findByIdAndIsRemovedIsFalse(id));
        return test1.map(testRepository::save).orElseThrow(()-> new BadRequestServiceAlertException(Constant.IDDOESNOTEXIT));
    }

    public Test getTestById(final String id) {
        return this.testRepository.findById(id).orElseThrow(()-> new BadRequestServiceAlertException(Constant.IDDOESNOTEXIT));
    }

    public List<Test> getAllUnRegisterSet(final String id){
        return this.testRepository.findAllByUsers_UserCredential_IdAndIsRemovedIsFalse(id);
    }

    public String deleteTest(final String id){
        this.testRepository.deleteById(id);
        return Constant.DELETE;
    }

    public ResponseMarkResultDTO answer(final String testId, final Map<String, String> answerDTO,final String id) {
        Test testIsPresent=testRepository.findById(testId).orElseThrow();
        System.out.println(testId);
        if(!testIsPresent.getQuestionSet().getIsPractice()){
            answerRepository.save(
                    Answer.builder().userAnswer(answerDTO.toString())
                    .userCredential(UserCredential.builder().id(id).build())
                    .questionSet(testRepository.findById(testId).orElseThrow().getQuestionSet()).build()
            );
        }
        List<Question> questions = this.questionRepository.findAllByQuestionSet_Id(testIsPresent.getQuestionSet().getId());
        AtomicInteger mark = new AtomicInteger();

        questions.forEach(question -> {
            if (question.getAnswer().equals(answerDTO.get(question.getId()))) {
                mark.incrementAndGet();
            }
        });
        if(!testIsPresent.getQuestionSet().getIsPractice()) {
            Test test=this.testRepository.findById(testId).orElseThrow();
            test.setMark((float)(mark.get()*100/ questions.size()));
            test.setIsActive(true);
            testRepository.save(test);
        }

        return ResponseMarkResultDTO.builder()
                .mark(mark.get()).mark(mark.get()*2)
                .totalQuestion(questions.size())
                .passMark((questions.size()*2)/2)
                .wrongAnswerPer((float)((questions.size()-mark.get())*100/ questions.size()))
                .correctAnswerPer((float)(mark.get()*100/ questions.size()))
                .correctAnswer(mark.get())
                .build();
    }


    public List<Test> getTestUser(final String id) {
        return this.testRepository.findAllByUsers_UserCredential_IdAndIsActiveIsTrue(id);
    }

    public Integer getPendingTest(final String id) {
        return this.testRepository.findAllByUsers_UserCredential_IdAndQuestionSet_IsPracticeIsFalseAndIsActiveIsFalse(id).size();
    }
    public Page<Test> getPendingSearchTest(final int pageNo, final int pageSize, final String fieldName, final Sort.Direction direction,final String id) {
        Pageable pageable =  PageRequest.of(pageNo, pageSize, Sort.by(direction, fieldName));
        return this.testRepository.findAllByUsers_UserCredential_IdAndQuestionSet_IsPracticeIsFalseAndIsActiveIsFalse(id,pageable);
    }

    public List<QuestionDTO> retriveQuestionSet(final String id) {
        return questionService.getQuestionSet(this.testRepository.findById(id).orElseThrow().getQuestionSet().getId());
    }


    public Float getAverageMark(final String id) {
        List<Test> test=this.testRepository.findAllByUsers_UserCredential_Id(id);
        if( test.isEmpty()) return 0.0F;
        Float totalMark=0F;
        for(Test tests:test){
            if(tests.getMark()!=null)totalMark+=tests.getMark();
        }
        return totalMark/ test.size();
    }

    public List<QuestionDTO> getPracticeTestQuestion(final String questionSetId,final String id) {
        Test test=this.testRepository.findAllByUsers_UserCredential_IdAndQuestionSet_IsPracticeIsTrueAndIsActiveIsFalseAndQuestionSet_Id(id,questionSetId);
        return questionService.getQuestionSet(test.getQuestionSet().getId());
    }

    public Integer getPracticeTest(final String id) {
        return this.testRepository.findAllByUsers_UserCredential_IdAndQuestionSet_IsPracticeIsTrueAndIsActiveIsFalse(id).size();
    }

    public Page<Test> getSearchAssignment(final String search, final int pageNo, final int pageSize, final String fieldName, final Sort.Direction direction,final String id) {
        Pageable pageable =  PageRequest.of(pageNo, pageSize, Sort.by(direction, fieldName));
        return this.testRepository.findAllByUserCredentialIdAndSubject(id, search,pageable);
    }

    public Page<Test> getCompletedTestSearch(final String search, final int pageNo, final int pageSize, final String fieldName, final Sort.Direction direction,final String id) {
        Pageable pageable =  PageRequest.of(pageNo, pageSize, Sort.by(direction, fieldName));
        return this.testRepository.findAllByUserCredentialIdAndSubjectCompleted(id,search, pageable);
    }



    public Page<Test> getPracticeTestSearch(final String search, final int pageNo, final int pageSize, final String fieldName, final Sort.Direction direction,final String id) {
        Pageable pageable =  PageRequest.of(pageNo, pageSize, Sort.by(direction, fieldName));
        return this.testRepository.findAllByUserCredentialIdAndSubjectPractice(id,search,pageable);

    }

    public List<Test> getAllUserRegisterTest(final String id) {
        return this.testRepository.findAllByUsers_UserCredential_Id(id);
    }

//    public RetrieveUserInfoDTO retrieveUserInfo(final String id) {
//        List<List<Integer>> testData=null;
//        User user=userService.getUser(id);
//        return RetrieveUserInfoDTO.builder()
//                .practiceTest(getPracticeTest(id))
//                .email(user.getUserCredential().getEmail())
//                .phoneNumber(user.getPhoneNumber())
//                .testCompleted(getAllCompletedTest(id))
//                .practiceTest(getPracticeTest(id))
//                .assignmentPending(getPendingTest(id))
//                .avgMark(getAverageMark(id))
//                .totalRegisterTest(testData.get(0).get(0))
//                .availableTest(testData.get(0).get(1))
//                .totalRegisterPractice(testData.get(1).get(0))
//                .totalAvailablePractice(testData.get(1).get(1))
//                .build();
//    }
}
