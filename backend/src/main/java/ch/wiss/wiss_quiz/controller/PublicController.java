package ch.wiss.wiss_quiz.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class PublicController {

  @GetMapping(path = "/**")
  public String getTestPage() {
    return "<h1>Test page</h1>";
  }
}
