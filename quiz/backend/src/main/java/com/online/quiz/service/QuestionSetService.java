package com.online.quiz.service;

import com.online.quiz.dto.QuestionSetDTO;
import com.online.quiz.dto.RetrieveUserInfoDTO;
import com.online.quiz.entity.QuestionSet;
import com.online.quiz.entity.Test;
import com.online.quiz.entity.Users;
import com.online.quiz.exception.BadRequestServiceAlertException;
import com.online.quiz.repository.QuestionSetRepository;
import com.online.quiz.uitl.Constant;
import com.online.quiz.uitl.JwtFilter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class QuestionSetService {

    private final QuestionSetRepository questionSetRepository;
    private final TestService testService;
    private final JwtFilter jwtFilter;
    private final UserService userService;

    public QuestionSetService(QuestionSetRepository questionSetRepository, TestService testService, JwtFilter jwtFilter, UserService userService) {
        this.questionSetRepository = questionSetRepository;
        this.testService = testService;
        this.jwtFilter = jwtFilter;
        this.userService = userService;
    }

    public QuestionSet createQuestionSet(final QuestionSetDTO questionSetDTO) throws IOException {
        return this.questionSetRepository.save(QuestionSet.builder().subject(questionSetDTO.getSubject())
                .isRemoved(false).isPractice(questionSetDTO.getChoise()).image(questionSetDTO.getImage().getBytes()).build());
    }

    public QuestionSet getQuestionSet(final String id) {
        return this.questionSetRepository.findById(id).orElseThrow(()-> new BadRequestServiceAlertException(Constant.IDDOESNOTEXIT));
    }

    public List<QuestionSet> getAllQuestionSet() {
        return this.questionSetRepository.findByIsRemovedFalse();
    }

    public QuestionSet updateQuestionSet(final String id, final QuestionSet questionSet) {
        return this.questionSetRepository.findById(id).map(question -> {
            if (questionSet.getSubject() != null) {
                question.setSubject(questionSet.getSubject());
            }
            if(questionSet.getIsPractice()!=null){
                question.setIsPractice(questionSet.getIsPractice());
            }
            return this.questionSetRepository.save(question);
        }).orElseThrow(()-> new BadRequestServiceAlertException(Constant.IDDOESNOTEXIT));
    }

    public String deleteQuestionSet(final String id) {
        return this.questionSetRepository.findById(id).map(questionSet -> {
            questionSet.setIsRemoved(true);
            questionSetRepository.save(questionSet);
            return "Delete Successful";
        }).orElseThrow(()-> new BadRequestServiceAlertException(Constant.IDDOESNOTEXIT));
    }

    public List<QuestionSet> getAllUnRegisterSet() {
        List<Test> test=testService.getAllUnRegisterSet(jwtFilter.extractUsername().get("sub", String.class));
        List<String> setId=new LinkedList<>(){{
            test.forEach(data->add(data.getQuestionSet().getId()));
        }};
        if(setId.isEmpty()) {
            setId.add("");
        }
        return this.questionSetRepository.findAllByIdNotIn(setId);
    }

    public List<List<Integer>> getAvailableRegister(String id) {
        List<Test> test=this.testService.getAllUserRegisterTest(id);
        AtomicInteger practice= new AtomicInteger();
                test.forEach(testData->{
                    if(testData.getQuestionSet().getIsPractice()) practice.getAndIncrement();
                });
        List<QuestionSet> questionSets=this.questionSetRepository.findAll();
        AtomicInteger practiceInRegister = new AtomicInteger();
        questionSets.forEach(questionSet -> {
            if(questionSet.getIsPractice()) practiceInRegister.getAndIncrement();
        });

        List<List<Integer>> result = new LinkedList<>();
        result.add(new LinkedList<>(List.of(
                test.size() - practice.get(),
                questionSets.size()+practice.get()-test.size()-practiceInRegister.get()
        )));
        result.add(new LinkedList<>(List.of(
                practice.get(),
                practiceInRegister.get()-practice.get()
        )));
        return result;
    }

    public Page<QuestionSet> getAllUnRegisterSetAssignment(final String search, final int pageNo, final int pageSize, final String fieldName, final Sort.Direction direction) {
        Pageable pageable =  PageRequest.of(pageNo, pageSize, Sort.by(direction, fieldName));
        List<Test> test=testService.getAllUnRegisterSet(jwtFilter.extractUsername().get("sub", String.class));
        List<String> setId=new LinkedList<>(){{
            test.forEach(data->add(data.getQuestionSet().getId()));
        }};
        return this.questionSetRepository.findAllByIdNotInAndIsPracticeIsFalse(setId, search, pageable);
    }

    public Page<QuestionSet> getAllUnRegisterSetTest(String search, int pageNo, int pageSize, String fieldName, Sort.Direction direction) {
        Pageable pageable =  PageRequest.of(pageNo, pageSize, Sort.by(direction, fieldName));
        List<Test> test=testService.getAllUnRegisterSet(jwtFilter.extractUsername().get("sub", String.class));
        List<String> setId=new LinkedList<>(){{
            test.forEach(data->add(data.getQuestionSet().getId()));
        }};
        return this.questionSetRepository.findAllByIdNotInAndIsPracticeIsTrue(setId, search, pageable);
    }

    public Page<QuestionSet> getQuestionSetSearch(String search, int pageNo, int pageSize, String fieldName, Sort.Direction direction) {
        Pageable pageable =  PageRequest.of(pageNo, pageSize, Sort.by(direction, fieldName));
        return this.questionSetRepository.findAllByIsRemovedIsFalse(search, pageable);
    }

    public RetrieveUserInfoDTO retrieveUserInfo(final String id) {
        List<List<Integer>> testData=getAvailableRegister(id);
        Users user=userService.getUser(id);
        return RetrieveUserInfoDTO.builder()
                .image(user.getImage())
                .practiceTest(testService.getPracticeTest(id))
                .email(user.getUserCredential().getEmail())
                .name(user.getName())
                .phoneNumber(user.getPhoneNumber())
                .testCompleted(testService.getAllCompletedTest(id))
                .practiceTest(testService.getPracticeTest(id))
                .assignmentPending(testService.getPendingTest(id))
                .avgMark(testService.getAverageMark(id))
                .totalRegisterTest(testData.get(0).get(0))
                .availableTest(testData.get(0).get(1))
                .totalRegisterPractice(testData.get(1).get(0))
                .totalAvailablePractice(testData.get(1).get(1))
                .build();
    }

//    public void sample(MultipartFile image,String id) throws IOException {
//        QuestionSet questionSet=this.questionSetRepository.findById(id).orElseThrow();
//        questionSet.setImage(image.getBytes());
//        this.questionSetRepository.save(questionSet);
//
//    }
}
