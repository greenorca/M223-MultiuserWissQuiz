package ch.wiss.wiss_quiz.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ch.wiss.wiss_quiz.model.Answer;
import ch.wiss.wiss_quiz.model.AnswerRepository;
import ch.wiss.wiss_quiz.model.Category;
import ch.wiss.wiss_quiz.model.CategoryRepository;
import ch.wiss.wiss_quiz.model.Question;
import ch.wiss.wiss_quiz.model.QuestionRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(path="/question") // This means URL's start with /question (after Application path)
public class QuestionController {

  @Autowired
  private QuestionRepository questionRepository;
  @Autowired
  private CategoryRepository categoryRepository;
  @Autowired
  private AnswerRepository answerRepository;
  
  @PostMapping(path="/{cat_id}") // Map ONLY POST Requests
  public @ResponseBody String addNewQuestion(@PathVariable(value="cat_id") Integer catId, @RequestBody Question question) {
      
    Optional<Category> cat = categoryRepository.findById(catId);
    question.setCategory(cat.get());
    // we need to store nested Answer-Objects seperately
    List<Answer> answers = List.copyOf(question.getAnswers());
    
    question.setAnswers(null);
    questionRepository.save(question);
    
    // we need to store nested Answer-Objects seperately
    answers.forEach(a -> {
      a.setQuestion(question);
      answerRepository.save(a);
	});
	
	return "Saved";
  }
  
  @GetMapping(path="")
  public @ResponseBody Iterable<Question> getAllQuestions() {    
    return questionRepository.findAll();
  } 
    
}