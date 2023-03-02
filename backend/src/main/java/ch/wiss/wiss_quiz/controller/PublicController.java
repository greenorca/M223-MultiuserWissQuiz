package ch.wiss.wiss_quiz.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/all")
public class PublicController {

  @GetMapping(path = "/**")
  public ResponseEntity<String> getTestPage() {
    ResponseEntity<String> result = ResponseEntity.ok()
      .body("<h1>Test page</h1>");
    return result;
  }
}
