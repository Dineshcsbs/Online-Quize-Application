package com.online.quiz.service;

import com.online.quiz.entity.QuestionSet;
import com.online.quiz.entity.Test;
import com.online.quiz.repository.QuestionSetRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@AllArgsConstructor
public class QuestionSetService {

    private final QuestionSetRepository questionSetRepository;
    private final TestService testService;

    public QuestionSet createQuestionSet(final String subject) {
        return this.questionSetRepository.save(QuestionSet.builder().subject(subject).isRemoved(false).build());
    }

    public QuestionSet getQuestionSet(final String id) {
        return this.questionSetRepository.findById(id).orElseThrow();
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
        }).orElseThrow();
    }

    public String deleteQuestionSet(final String id) {
        return this.questionSetRepository.findById(id).map(questionSet -> {
            questionSet.setIsRemoved(true);
            questionSetRepository.save(questionSet);
            return "Delete Successful";
        }).orElseThrow();
    }

    public List<QuestionSet> getAllUnRegisterSet() {
        List<Test> test=testService.getAllUnRegisterSet();
        List<String> setId=new LinkedList<>(){{
            test.forEach(data->add(data.getQuestionSet().getId()));
        }};
        if(setId.isEmpty()) {
            setId.add("");
        }
        return this.questionSetRepository.findAllByIdNotIn(setId);
    }

    public List<List<Integer>> getAvailableRegister() {
        List<Test> test=this.testService.getAllUserRegisterTest();
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
        List<Test> test=testService.getAllUnRegisterSet();
        List<String> setId=new LinkedList<>(){{
            test.forEach(data->add(data.getQuestionSet().getId()));
        }};
        return this.questionSetRepository.findAllByIdNotInAndIsPracticeIsFalse(setId, search, pageable);
    }

    public Page<QuestionSet> getAllUnRegisterSetTest(String search, int pageNo, int pageSize, String fieldName, Sort.Direction direction) {
        Pageable pageable =  PageRequest.of(pageNo, pageSize, Sort.by(direction, fieldName));
        List<Test> test=testService.getAllUnRegisterSet();
        List<String> setId=new LinkedList<>(){{
            test.forEach(data->add(data.getQuestionSet().getId()));
        }};
        return this.questionSetRepository.findAllByIdNotInAndIsPracticeIsTrue(setId, search, pageable);
    }

//    public void sample(MultipartFile image,String id) throws IOException {
//        QuestionSet questionSet=this.questionSetRepository.findById(id).orElseThrow();
//        questionSet.setImage(image.getBytes());
//        this.questionSetRepository.save(questionSet);
//
//    }
}
