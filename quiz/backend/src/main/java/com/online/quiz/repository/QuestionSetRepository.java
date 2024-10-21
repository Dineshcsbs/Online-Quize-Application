package com.online.quiz.repository;

import com.online.quiz.entity.QuestionSet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionSetRepository extends JpaRepository<QuestionSet, String> {
    List<QuestionSet> findByIsRemovedFalse();

//    List<QuestionSet> findAllByIdIn(List<String> setId);

    List<QuestionSet> findAllByIdNotIn(List<String> setId);

    @Query("SELECT qs FROM QuestionSet qs WHERE qs.id NOT IN :setId " +
            "AND qs.isPractice = false " +
            "AND (:search IS NULL OR LOWER(qs.subject) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<QuestionSet> findAllByIdNotInAndIsPracticeIsFalse(
            @Param("setId") List<String> setId,
            @Param("search") String search,
            Pageable pageable);

    @Query("SELECT qs FROM QuestionSet qs WHERE qs.id NOT IN :setId " +
            "AND qs.isPractice = true " +
            "AND (:search IS NULL OR LOWER(qs.subject) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<QuestionSet> findAllByIdNotInAndIsPracticeIsTrue(List<String> setId, String search, Pageable pageable);
}
