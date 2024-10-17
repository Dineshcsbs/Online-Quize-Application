package com.online.quiz.dto;

import com.online.quiz.entity.Question;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class AnswerDTO {
    private Question question;
    private Boolean ans;
}
