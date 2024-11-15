package com.online.quiz.repository;

import com.online.quiz.entity.Test;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.nio.channels.FileChannel;
import java.util.List;
import java.util.Optional;

@Repository
public interface TestRepository extends JpaRepository<Test,String> {

    List<Test> findAllByIsActiveIsTrueAndIsRemovedIsFalse();

    Test findByIdAndIsRemovedIsFalse(String id);

    List<Test> findAllByUsers_UserCredential_Id(String userCredentialId);

    List<Test> findAllByUsers_UserCredential_IdAndQuestionSet_IsPracticeIsFalseAndIsActiveIsFalse(String sub);
    Page<Test> findAllByUsers_UserCredential_IdAndQuestionSet_IsPracticeIsFalseAndIsActiveIsFalse(String sub,final Pageable pageable);

    List<Test> findAllByUsers_UserCredential_IdAndIsActiveIsTrue(String sub);

    List<Test> findAllByIsActiveTrueAndIsRemovedFalseAndUsers_UserCredential_Id(String sub);

    List<Test> findAllByUsers_UserCredential_IdAndIsRemovedIsFalse(String sub);

    List<Test> findAllByUsers_UserCredential_IdAndQuestionSet_IsPracticeIsTrueAndIsActiveIsFalse(String sub);

    Test findAllByUsers_UserCredential_IdAndQuestionSet_IsPracticeIsTrueAndIsActiveIsFalseAndQuestionSet_Id(String sub, String id);

//    @Query("SELECT t FROM Test t JOIN t.questionSet q " +
//            "WHERE LOWER(q.subject) LIKE LOWER(CONCAT('%', :search, '%')) " +
//            " AND t.isActive IS FALSE AND t.isRemoved IS FALSE "+
//            "AND t.users.userCredential.id = :userCredentialId")
    @Query("SELECT t FROM Test t JOIN t.questionSet q " +
        "WHERE t.isActive = FALSE AND t.isRemoved = FALSE AND q.isPractice = FALSE " +
        "AND t.users.userCredential.id = :userCredentialId " +
        "AND (:search IS NULL OR :search = '' OR LOWER(q.subject) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Test> findAllByUserCredentialIdAndSubject( @Param("userCredentialId") String userCredentialId,@Param("search") String search,final Pageable pageable);

    @Query("SELECT t FROM Test t JOIN t.questionSet q " +
            "WHERE t.isActive = TRUE AND t.isRemoved = FALSE " +
            "AND t.users.userCredential.id = :userCredentialId " +
            "AND (:search IS NULL OR :search = '' OR LOWER(q.subject) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Test> findAllByUserCredentialIdAndSubjectCompleted(@Param("userCredentialId") String userCredentialId, @Param("search") final String search, final Pageable pageable);

    @Query("SELECT t FROM Test t JOIN t.questionSet q " +
            "WHERE t.isActive = FALSE AND t.isRemoved = FALSE AND q.isPractice = TRUE " +
            "AND t.users.userCredential.id = :userCredentialId " +
            "AND (:search IS NULL OR :search = '' OR LOWER(q.subject) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Test> findAllByUserCredentialIdAndSubjectPractice( @Param("userCredentialId") String userCredentialId,@Param("search") String keyword,final Pageable pageable);

}