package com.online.quiz.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Builder
@Data
public class QuestionSetDTO {
    private String subject;
    private Boolean choise;
    private MultipartFile image;
}
