package com.online.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QuestionDTO {

    private String questionId;
    private String question;
    private List<String> option;
//    private String option2;
//    private String option3;
//    private String option4;
}
