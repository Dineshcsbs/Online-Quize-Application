package com.online.quiz.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CurrentTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionSet {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String subject;
    @CurrentTimestamp
    private Instant createdAt;
    @UpdateTimestamp
    private Instant updatedAt;
    private Boolean isRemoved;
    private Boolean isPractice;
}
