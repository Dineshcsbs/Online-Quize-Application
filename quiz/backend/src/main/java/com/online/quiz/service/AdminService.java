package com.online.quiz.service;

import com.online.quiz.dto.SignUpRequestDTO;
import com.online.quiz.entity.Admin;
import com.online.quiz.entity.UserCredential;
import com.online.quiz.exception.BadRequestServiceAlertException;
import com.online.quiz.repository.AdminRepository;
import com.online.quiz.uitl.Constant;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AdminService {

    private final AdminRepository adminRepository;

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

    public Admin updateAdmin(final String id, final Admin admin) {
        return adminRepository.findById(id).map(adminInfo -> {
            if (admin.getName() != null) {
                adminInfo.setName(admin.getName());
            }
            if (admin.getGender() != null) {
                adminInfo.setGender(admin.getGender());
            }
            if (admin.getPhoneNumber() != null) {
                adminInfo.setPhoneNumber(admin.getPhoneNumber());
            }
            return this.adminRepository.save(adminInfo);
        }).orElseThrow(()-> new BadRequestServiceAlertException(Constant.IDDOESNOTEXIT));
    }

}
