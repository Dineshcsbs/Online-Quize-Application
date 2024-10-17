package com.online.quiz.uitl;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Map;
import java.util.Optional;

@Component
@Scope(value = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class JwtFilter {

    @Autowired
    private HttpServletRequest request;

    @Value("${security.jwt.secret-key}")
    private String SECRET;

    public Claims extractUsername() {
        String token = request.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
//            throw new BadRequestServiceAlertException("Missing or invalid Authorization header");
        }
        token = token.substring(7);
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getSignKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
//            throw new BadRequestServiceAlertException("Invalid token");
        }
        return null;
    }

    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

//    public static Optional<String> getCurrentUserLogin() {
//        SecurityContext securityContext = SecurityContextHolder.getContext();
//        return Optional.ofNullable(extractPrincipal(securityContext.getAuthentication()));
//    }

//    private static String extractPrincipal(Authentication authentication) {
//        if (authentication == null) {
//            return null;
//        } else if (authentication.getPrincipal() instanceof UserDetails) {
//            UserDetails springSecurityUser = (UserDetails) authentication.getPrincipal();
//            return springSecurityUser.getUsername();
//        }
////        } else if (authentication instanceof JwtAuthenticationToken) {
////            return (String) ((JwtAuthenticationToken) authentication).getToken().getClaims().get("username");
////        } else if (authentication.getPrincipal() instanceof DefaultOidcUser) {
////            Map<String, Object> attributes = ((DefaultOidcUser) authentication.getPrincipal()).getAttributes();
////            if (attributes.containsKey("username")) {
////                return (String) attributes.get("username");
////            }
////        } else if (authentication.getPrincipal() instanceof String) {
////            return (String) authentication.getPrincipal();
////        }
//        return null;
//    }
}
