package com.online.quiz.service;

import com.online.quiz.dto.SignUpRequestDTO;
import com.online.quiz.dto.UpdateUserDTO;
import com.online.quiz.entity.User;
import com.online.quiz.entity.UserCredential;
import com.online.quiz.exception.BadRequestServiceAlertException;
import com.online.quiz.repository.UserRepository;
import com.online.quiz.uitl.Constant;
import com.online.quiz.uitl.JwtFilter;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JwtFilter jwtFilter;

    public void createUser(final SignUpRequestDTO signUpRequestDTO, final UserCredential userCredential) {
        userRepository.save(User.builder()
                .name(signUpRequestDTO.getName())
                .isRemoved(false)
                .userCredential(userCredential)
                .build());
    }

    public User getUser(final String id) {
        return this.userRepository.findById(id).orElseThrow(()-> new BadRequestServiceAlertException(Constant.IDDOESNOTEXIT));
    }

    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    public User updateUser(UpdateUserDTO user) {
        Optional<User> optionalUser = Optional.ofNullable(userRepository.findByUserCredential_Id(jwtFilter.extractUsername().get("sub", String.class)));

        return optionalUser.map(userInfo -> {
                    if (user.getGender() != null) {
                        userInfo.setGender(user.getGender());
                    }
                    if (user.getName() != null) {
                        userInfo.setName(user.getName());
                    }
                    if (user.getPhoneNumber() != null) {
                        userInfo.setPhoneNumber(user.getPhoneNumber());
                    }
                    if (user.getImage() != null) {
                        try {
                            userInfo.setImage(user.getImage().getBytes());
                        } catch (IOException e) {
                            throw new RuntimeException(e.getMessage());
                        }
                    }
                    return userRepository.save(userInfo);
                })
                .orElseThrow(()-> new BadRequestServiceAlertException(Constant.IDDOESNOTEXIT));
    }

    public User getUserDetail() {
        return this.userRepository.findByUserCredentialId(jwtFilter.extractUsername().get("sub",String.class));
    }

//    public User updateUserInfo(UpdateUserDTO updateUserDTO) {
//    }
}
