package pl.team.touchtalk.filters;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import pl.team.touchtalk.repo.JsonWebTokenPrefixesRepository;
import pl.team.touchtalk.services.AuthenticationTokenProvider;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


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
            UsernamePasswordAuthenticationToken result = AuthenticationTokenProvider.getAuthenticationToken(header);
            SecurityContextHolder.getContext().setAuthentication(result);
        } catch (ExpiredJwtException e) {
            SecurityContextHolder.clearContext();
        } finally {
            chain.doFilter(request, response);
        }
    }

}
