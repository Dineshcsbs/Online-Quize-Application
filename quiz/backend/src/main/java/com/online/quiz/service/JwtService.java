package com.online.quiz.service;

import com.online.quiz.exception.BadRequestServiceAlertException;
import com.online.quiz.uitl.Constant;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtService {

    @Value("${security.jwt.secret-key}")
    private String SECREAT;

    public boolean validationToken(final String token) {
        Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token);
        return true;
    }

    public String generateToken(String userName, String userId, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", userName);
        claims.put("role", role);
        return createToken(claims, userId);
    }

    public String createToken(Map<String, Object> claims, String userId) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userId)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + (12 * 60 * 60 * 1000)))
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .compact();
    }

    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECREAT);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUserName(String token) {
        try {
            Claims claims = Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token).getBody();
            return claims.get("email", String.class);
        } catch (JwtException | IllegalArgumentException e) {
            throw new BadRequestServiceAlertException(Constant.IDDOESNOTEXIT);
        }
    }
}

