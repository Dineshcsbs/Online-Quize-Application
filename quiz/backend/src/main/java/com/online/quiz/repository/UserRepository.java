package com.online.quiz.repository;

import com.online.quiz.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,String> {
    User findByUserCredentialId(String sub);

    User findByUserCredential_Id(String sub);
}
