package com.online.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResponseMarkResult {

    private Integer totalQuestion;
    private Integer correctAnswer;
    private Integer mark;
    private Integer passMark;
    private Float correctAnswerPer;
    private Float wrongAnswerPer;
}
