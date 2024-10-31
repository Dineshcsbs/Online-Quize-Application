package com.online.quiz.repository;

import com.online.quiz.entity.Admin;
import com.online.quiz.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin,String> {
    Admin findByUserCredentialId(String sub);

    Admin findByUserCredential_Id(String sub);
}
