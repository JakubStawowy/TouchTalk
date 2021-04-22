package pl.team.touchtalk.services;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;
import pl.team.touchtalk.entities.User;
import pl.team.touchtalk.repositories.SigningKeyRepository;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

/*
 * JsonWebTokenProvider class
 *
 * @Author Jakub Stawowy
 * @Version 1.0
 * @Since 2021-04-12
 * */
@Service
public class JsonWebTokenProvider  {
    public String generateToken(User user) {

        Key signingKey = new SecretKeySpec(SigningKeyRepository.getSigningKey().getBytes(StandardCharsets.UTF_8), SignatureAlgorithm.HS512.getJcaName());
        String name = user.getUserDetails().getName()+" "+user.getUserDetails().getSurname();

        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("role", "ROLE_ADMIN")
                .claim("name", name)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+60000))
                .signWith(SignatureAlgorithm.HS512, signingKey)
                .compact();
    }
}
