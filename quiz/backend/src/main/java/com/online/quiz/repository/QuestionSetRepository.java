package com.online.quiz.repository;

import com.online.quiz.entity.QuestionSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionSetRepository extends JpaRepository<QuestionSet, String> {
    List<QuestionSet> findByIsRemovedFalse();

//    List<QuestionSet> findAllByIdIn(List<String> setId);

    List<QuestionSet> findAllByIdNotIn(List<String> setId);
}
