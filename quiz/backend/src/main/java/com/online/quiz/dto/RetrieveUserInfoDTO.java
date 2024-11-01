package com.online.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class RetrieveUserInfoDTO {
    private byte[] image;
    private String name;
    private String email;
    private String phoneNumber;
    private Integer testCompleted;
    private Integer practiceTest;
    private Integer assignmentPending;
    private Float avgMark;
    private Integer totalRegisterTest;
    private Integer availableTest;
    private Integer totalRegisterPractice;
    private Integer totalAvailablePractice;
}
