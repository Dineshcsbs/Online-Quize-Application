package com.online.quiz.service;

import com.online.quiz.dto.SignUpRequestDTO;
import com.online.quiz.dto.UpdateUserDTO;
import com.online.quiz.entity.Admin;
import com.online.quiz.entity.User;
import com.online.quiz.entity.UserCredential;
import com.online.quiz.exception.BadRequestServiceAlertException;
import com.online.quiz.repository.AdminRepository;
import com.online.quiz.uitl.Constant;
import com.online.quiz.uitl.JwtFilter;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
//@AllArgsConstructor
public class AdminService {

    private final AdminRepository adminRepository;
    private final JwtFilter jwtFilter;

    public AdminService(AdminRepository adminRepository, JwtFilter jwtFilter) {
        this.adminRepository = adminRepository;
        this.jwtFilter = jwtFilter;
    }

    public void createAdmin(SignUpRequestDTO signUpRequestDTO, UserCredential userCredential) {
        adminRepository.save(Admin.builder()
                .name(userCredential.getName())
                .userCredential(userCredential)
                .build());
    }

    public Admin getAdmin(final String id) {
        return this.adminRepository.findById(id).orElseThrow(()-> new BadRequestServiceAlertException(Constant.NOT_FOUND));
    }

    public List<Admin> getAllAdmin() {
        return this.adminRepository.findAll();
    }

    public Admin updateAdmin(UpdateUserDTO admin) {
        Optional<Admin> optionalAdmin = Optional.ofNullable(adminRepository.findByUserCredential_Id(jwtFilter.extractUsername().get("sub", String.class)));

        return optionalAdmin.map(userInfo -> {
                    if (admin.getGender() != null) {
                        userInfo.setGender(admin.getGender());
                    }
                    if (admin.getName() != null) {
                        userInfo.setName(admin.getName());
                    }
                    if (admin.getPhoneNumber() != null) {
                        userInfo.setPhoneNumber(admin.getPhoneNumber());
                    }
                    if (admin.getImage() != null) {
                        try {
                            userInfo.setImage(admin.getImage().getBytes());
                        } catch (IOException e) {
                            throw new RuntimeException(e.getMessage());
                        }
                    }
                    return adminRepository.save(userInfo);
                })
                .orElseThrow(()-> new BadRequestServiceAlertException(Constant.IDDOESNOTEXIT));
    }
//    public Admin updateAdmin(final String id, final Admin admin) {
//        return adminRepository.findById(id).map(adminInfo -> {
//            if (admin.getName() != null) {
//                adminInfo.setName(admin.getName());
//            }
//            if (admin.getGender() != null) {
//                adminInfo.setGender(admin.getGender());
//            }
//            if (admin.getPhoneNumber() != null) {
//                adminInfo.setPhoneNumber(admin.getPhoneNumber());
//            }
//            return this.adminRepository.save(adminInfo);
//        }).orElseThrow(()-> new BadRequestServiceAlertException(Constant.IDDOESNOTEXIT));
//    }

    public Admin getAdminDetail(final String id) {
        return this.adminRepository.findByUserCredentialId(id);
    }
}
