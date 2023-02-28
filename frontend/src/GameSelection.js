import React from "react"
import './GameSelection.css';
import { getTopics } from './CategoriesApi';

/**
* handles a set of Questions
*/
class GameSelection extends React.Component{
    
    /*constructor(props){
        super(props)
        //this.fetchAnswer = this.fetchAnswer.bind(this)
        //this.nextQuestion =this.nextQuestion.bind(this)
    }*/

    render(){
        let items = getTopics().map((val) => {
            return( <li key={"catid_"+val.id} > {val.name.toUpperCase()} </li>)
        })
        return (
            <div>
                <h4>Choose your topic</h4>
                <ul className="topics">{ items }</ul>
            </div>        
        )
    }
}

export default GameSelection
