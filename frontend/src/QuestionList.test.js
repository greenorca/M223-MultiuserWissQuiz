import { render, screen } from '@testing-library/react';
import QuestionList from './QuestionList';


test("Table is properly renedered", () => {
    // Arrange
    let questions = [
        {
          id: "myId",
          question: "Meine BeispielFrage",
          answers: ["Antwort 1", "Antwort 2", "Antwort 3"],
          correct_answer: "Meine Antwort 1",
        }
    ]

    // Act
    render(
        <QuestionList questions={ questions } />
    )

    // Assert
    expect(screen.getByText("Meine BeispielFrage"));
    expect(screen.getByText("Antwort 1"));
    expect(screen.getByText("Antwort 2"));
    expect(screen.getByText("Antwort 3"));
    expect(screen.getByText("Meine Antwort 1"));
});