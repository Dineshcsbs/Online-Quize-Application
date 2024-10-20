package com.online.quiz.service;

import com.online.quiz.entity.QuestionSet;
import com.online.quiz.entity.Test;
import com.online.quiz.repository.QuestionSetRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

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

//    public void sample(MultipartFile image,String id) throws IOException {
//        QuestionSet questionSet=this.questionSetRepository.findById(id).orElseThrow();
//        questionSet.setImage(image.getBytes());
//        this.questionSetRepository.save(questionSet);
//
//    }
}
