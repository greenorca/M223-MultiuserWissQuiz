import React from "react"

class QuestionList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: typeof props.questions === 'undefined' ? [] : props.questions
        };
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL+"/question/")
                .then(response => response.json())
                .then(data => this.setState({questions: data}))
                .catch(err => {console.log(err)})

    }

    render(){

        let questionRows = this.state.questions.map((question)=>{
            return(
                <tr key={"qid_"+question.id}>
                    <td>{question.id}</td>
                    <td>{question.question}</td>
                    <td>
                        <ul>
                        {question.answers.map((answer)=>{
                            return(
                                <li key={"aid_"+answer.id}>{answer.answer}</li>
                            );
                        })}
                        </ul>
                    </td>
                    <td>Wird nicht verraten ;)</td>
                </tr>
            );
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Question</th>
                        <th>Answers</th>
                        <th>Solution</th>
                    </tr>
                </thead>
                <tbody>
                    { questionRows }
                </tbody>
            </table>
        );
    }
}

export default QuestionList;
