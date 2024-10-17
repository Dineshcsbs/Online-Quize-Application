package com.online.quiz.repository;

import com.online.quiz.entity.Test;
import com.online.quiz.service.QuestionService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.nio.channels.FileChannel;
import java.util.List;
import java.util.Optional;

@Repository
public interface TestRepository extends JpaRepository<Test,String> {
//    List<Test> findAllByIsActive(boolean isActive);

    List<Test> findAllByIsActiveIsTrueAndIsRemovedIsFalse();

//    List<Test> findAllByIsActiveIsFalseAndIsRemovedIsFalse();

    Test findByIdAndIsRemovedIsFalse(String id);

//    Test findByUser_UserCredential_Id(String id);

    List<Test> findAllByUser_UserCredential_Id(String userCredentialId);

//    List<Test> findAllByUser_UserCredential_IdAndQuestionSet_IsPracticeIsFalse(String userCredentialId);

    List<Test> findAllByUser_UserCredential_IdAndQuestionSet_IsPracticeIsFalseAndIsActiveIsFalse(String sub);

//    List<Test> findAllByIsActiveTrueAndIsRemovedFalseAndUser_Id(String sub);

    List<Test> findAllByUser_UserCredential_IdAndIsActiveIsTrue(String sub);

    List<Test> findAllByIsActiveTrueAndIsRemovedFalseAndUser_UserCredential_Id(String sub);

//    List<Test> finadAllByUser_UserCredential_IdAndIsRemovedFalse(String sub);

    List<Test> findAllByUser_UserCredential_IdAndIsRemovedIsFalse(String sub);

//    List<Test> findAllByUser_UserCredential_IdAndQuestionSet_IsPracticeIsFalseAndIsActiveIsTrue(String sub);

    List<Test> findAllByUser_UserCredential_IdAndQuestionSet_IsPracticeIsTrueAndIsActiveIsFalse(String sub);

    Test findAllByUser_UserCredential_IdAndQuestionSet_IsPracticeIsTrueAndIsActiveIsFalseAndQuestionSet_Id(String sub, String id);

//    Test findByQuestion_Id(String id);

//    Test findByQuestionSet_Id(String id);

//     findAllByQuestionSet_id(String );

//    Test findByQuestionSet_IdAndUser_Id(String id, String sub);

//    Test findByIdAndUser_Id(String id, String sub);
}