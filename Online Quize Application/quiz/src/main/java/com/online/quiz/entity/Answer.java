package com.online.quiz.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)

    private String id;

    @ManyToOne
    private QuestionSet questionSet;

    @ManyToOne
    private UserCredential userCredential;
    @Column(length = 10000)
    private String userAnswer;
}
