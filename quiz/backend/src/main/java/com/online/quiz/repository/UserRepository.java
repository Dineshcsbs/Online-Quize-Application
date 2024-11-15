package com.online.quiz.repository;

import com.online.quiz.entity.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users,String> {
    Users findByUserCredentialId(String sub);

    Users findByUserCredential_Id(String sub);

    @Query("SELECT u FROM Users u JOIN u.userCredential uc " +
            "WHERE u.isRemoved = FALSE " +
            "AND (:search IS NULL OR :search = '' OR LOWER(uc.email) LIKE LOWER(CONCAT('%', :search, '%'))) " +
            "AND (:search IS NULL OR :search = '' OR LOWER(u.name) LIKE LOWER(CONCAT('%', :search, '%'))) " +
            "ORDER BY LOWER(u.name) ASC") // Sort by name
    Page<Users> findAllByAndIsRemovedIsFalse(String search, Pageable pageable);

}
//@Query("SELECT t FROM Test t JOIN t.questionSet q " +
//        "WHERE t.isActive = TRUE AND t.isRemoved = FALSE " +
//        "AND t.user.userCredential.id = :userCredentialId " +
//        "AND (:search IS NULL OR :search = '' OR LOWER(q.subject) LIKE LOWER(CONCAT('%', :search, '%')))")