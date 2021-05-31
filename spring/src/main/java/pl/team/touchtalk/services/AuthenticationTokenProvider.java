package pl.team.touchtalk.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import pl.team.touchtalk.repo.JsonWebTokenPrefixesRepository;
import pl.team.touchtalk.repo.SigningKeyRepository;

import java.nio.charset.StandardCharsets;
import java.util.Collections;

/*
 * AuthenticationTokenProvider class
 *
 * @Author Jakub Stawowy
 * @Version 1.0
 * @Since 2021-05-19
 * */
public class AuthenticationTokenProvider {

    public static UsernamePasswordAuthenticationToken getAuthenticationToken(String header) throws ExpiredJwtException {
        Jws<Claims> claimsJws = Jwts.parser().setSigningKey(SigningKeyRepository.getSigningKey().getBytes(StandardCharsets.UTF_8))
                .parseClaimsJws(header.replace(JsonWebTokenPrefixesRepository.getHeaderPrefix(), ""));

        String username = claimsJws.getBody().get("name").toString();
        String role = claimsJws.getBody().get("role").toString();

        return new UsernamePasswordAuthenticationToken(
                username,
                null,
                Collections.singletonList(new SimpleGrantedAuthority(role))
        );
    }
}
