package com.online.quiz.service;

import com.online.quiz.dto.AnswerDTO;
import com.online.quiz.dto.QuestionDTO;
import com.online.quiz.entity.Question;
import com.online.quiz.exception.BadRequestServiceAlertException;
import com.online.quiz.repository.AnswerRepository;
import com.online.quiz.repository.QuestionRepository;
import com.online.quiz.uitl.Constant;
import com.online.quiz.uitl.JwtFilter;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final JwtFilter jwtFilter;

    public QuestionService(QuestionRepository questionRepository, AnswerRepository answerRepository, JwtFilter jwtFilter) {
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
        this.jwtFilter = jwtFilter;
    }

    public Question createQuestion(final Question question) {
        return this.questionRepository.save(question);
    }

    public List<Question> getAllQuestion() {
        return this.questionRepository.findAll();
    }

    public Question getQuestion(final String id) {
        return this.questionRepository.findById(id).orElseThrow(()-> new BadRequestServiceAlertException(Constant.IDDOESNOTEXIT));
    }

    public Question updateQuestion(final String id, final Question question) {
        return this.questionRepository.findById(id).map(questionInfo -> {
            if (question.getQuestionDescription() != null) {
                questionInfo.setQuestionDescription(question.getQuestionDescription());
            }
            if (question.getOption1() != null) {
                questionInfo.setOption1(question.getOption1());
            }
            if (question.getOption2() != null) {
                questionInfo.setOption2(question.getOption2());
            }
            if (question.getOption3() != null) {
                questionInfo.setOption3(question.getOption3());
            }
            if (question.getOption4() != null) {
                questionInfo.setOption4(question.getOption4());
            }
            if (question.getAnswer() != null) {
                questionInfo.setAnswer(question.getAnswer());
            }
            return this.questionRepository.save(questionInfo);
        }).orElseThrow(()-> new BadRequestServiceAlertException(Constant.IDDOESNOTEXIT));
    }

    public QuestionDTO retriveQuestion() {
        return null;
    }

    public String deleteQuestion(final String id) {
        return this.questionRepository.findById(id).map(question -> {
            questionRepository.deleteById(id);
            return "Id removed Success";
        }).orElseThrow(()-> new BadRequestServiceAlertException(Constant.IDDOESNOTEXIT));
    }

    public List<QuestionDTO> getQuestionSet(String setId) {
        List<Question> listOfQuestion = this.questionRepository.findAllByQuestionSet_Id(setId);
        return listOfQuestion.stream().map(this::convertDTO ).collect(Collectors.toList());
    }
    public QuestionDTO convertDTO(final Question question){
        return QuestionDTO.builder().questionId(question.getId()).question(question.getQuestionDescription()).option(new LinkedList<>(){{
            add(question.getOption1());
            add(question.getOption2());
            add(question.getOption3());
            add(question.getOption4());
        }}).build();
    }

    public List<AnswerDTO> retriveAnswer(final String id) {
        List<AnswerDTO> answerDTO=new LinkedList<>();
        List<Question> questionAnswer = this.questionRepository.findAllByQuestionSet_Id(id);
        String answer = this.answerRepository.findByQuestionSet_IdAndUserCredential_Id(id,jwtFilter.extractUsername().get("sub", String.class)).getUserAnswer();
        System.err.println(answer);
        Map<String, String> retrievedData = Arrays.stream(answer.substring(1, answer.length() - 1).split(", "))
                .map(entry -> entry.split("=", 2))
                .filter(keyValue -> keyValue.length == 2)
                .collect(Collectors.toMap(keyValue -> keyValue[0], keyValue -> keyValue[1]));


        questionAnswer.forEach(data -> {
            boolean isCorrect = data.getAnswer().equals(retrievedData.get(data.getId()));
            answerDTO.add(AnswerDTO.builder().question(data).ans(isCorrect).build());
        });
        return answerDTO;
    }

    public Integer getCountOfQuestion(String id) {
        return this.questionRepository.findAllByQuestionSet_Id(id).size();
    }
}
