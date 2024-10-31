package com.online.quiz.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CurrentTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.swing.*;
import java.time.Instant;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String name;
    private String gender;
    private String phoneNumber;
    @CurrentTimestamp
    private Instant createdAt;
    @UpdateTimestamp
    private Instant updatedAt;
    @Lob
    @Column(length = 500000)
    private byte[] image;
    @OneToOne
    private UserCredential userCredential;
}
