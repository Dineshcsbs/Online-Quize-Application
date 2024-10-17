package com.online.quiz.repository;

import com.online.quiz.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer,String> {
    Answer findByQuestionSet_IdAndUserCredential_Id(String id, String sub);
}
