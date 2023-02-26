package ch.wiss.wiss_quiz.security;

import java.io.IOException;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;


/**
 * a filter that executes once per request. So we create AuthTokenFilter class that extends OncePerRequestFilter and override doFilterInternal() method. 
 */
public class AuthTokenFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtils jwtUtils;
  
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
  
    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);
  
    /**
     * What we do inside doFilterInternal():
     * – get JWT from the HTTP Cookies
     * – if the request has JWT, validate it, parse username from it
     * – from username, get UserDetails to create an Authentication object
     * – set the current UserDetails in SecurityContext using setAuthentication(authentication) method.
     *
     * After this, every time you want to get UserDetails, just use SecurityContext like this:
     * UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request,
        HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {
      try {
        String jwt = parseJwt((HttpServletRequest) request);
        if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
          String username = jwtUtils.getUserNameFromJwtToken(jwt);
  
          UserDetails userDetails = userDetailsService.loadUserByUsername(username);
          
          UsernamePasswordAuthenticationToken authentication = 
              new UsernamePasswordAuthenticationToken(userDetails,
                                                      null,
                                                      userDetails.getAuthorities());
          
          authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
  
          SecurityContextHolder.getContext().setAuthentication(authentication);
        }
      } catch (Exception e) {
        logger.error("Cannot set user authentication: {}", e);
      }
  
      filterChain.doFilter(request, response);
    }
  
    private String parseJwt(HttpServletRequest request) {
      String jwt = jwtUtils.getJwtFromCookies(request);
      return jwt;
    }

    
  }