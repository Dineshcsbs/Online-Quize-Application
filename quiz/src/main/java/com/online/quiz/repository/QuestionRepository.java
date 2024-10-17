package com.online.quiz.repository;

import com.online.quiz.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface QuestionRepository extends JpaRepository<Question,String> {
//    List<Question> findAllQuestionSet(String setId);

//    List<Question> findQuestionSet(String setId);

    List<Question> findAllByQuestionSet_Id(String setId);

//    List<Question> findAllByQuestionSet_IdAndUser_UserCredential_Id(String questionSetId, String userCredentialId);
}
