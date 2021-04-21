package pl.team.touchtalk.filters;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import pl.team.touchtalk.repositories.JsonWebTokenPrefixesRepository;
import pl.team.touchtalk.repositories.SigningKeyRepository;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Collections;


/*
 * JsonWebTokenFilter class
 *
 * @Author Jakub Stawowy
 * @Version 1.0
 * @Since 2021-04-12
 * */
public class JsonWebTokenFilter extends BasicAuthenticationFilter {

    public JsonWebTokenFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String header = request.getHeader(JsonWebTokenPrefixesRepository.getAuthPrefix());

        if (header == null || !header.startsWith(JsonWebTokenPrefixesRepository.getHeaderPrefix())) {
            chain.doFilter(request, response);
            return;
        }

        try {
            UsernamePasswordAuthenticationToken result = getAuthenticationByToken(header);
            SecurityContextHolder.getContext().setAuthentication(result);
        } catch (ExpiredJwtException e) {
            SecurityContextHolder.clearContext();
        } finally {
            chain.doFilter(request, response);
        }
    }

    private UsernamePasswordAuthenticationToken getAuthenticationByToken(String header) throws ExpiredJwtException {
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
