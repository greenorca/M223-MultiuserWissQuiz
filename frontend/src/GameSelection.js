import React from "react"
import './GameSelection.css';
import { getTopics } from './CategoriesApi';
import GameSession from "./GameSession";

/**
* handles a set of Questions
*/
export default class GameSelection extends React.Component{
    
    constructor(props){
        super(props)
        this.setSelection = this.setSelection.bind(this)
        this.renderCategoriesSelection = this.renderCategoriesSelection.bind(this)
        this.setState = this.setState.bind(this)

        this.setState({
            catId : -1
        })
    }

    setSelection(id){
        this.setState({
            catId: id 
        })
    }

    render(){
        let content = this.renderCategoriesSelection();

        return (
            <div>
                <h4>Game Selection</h4>
                <div>{ content }</div>
            </div>
            
        )
        /*switch (this.catId){
            case -1: return this.renderSelection();
            default: return <GameSession id={this.catId} />
        }*/
    }

    renderCategoriesSelection(){
        let items = getTopics().map((val) => {
            return( <li key={"catid_"+val.id} > {val.name.toUpperCase()} onClick={ this.setSelection(val.id) }</li>)
        })
        return (
            <div>
                <h4>Choose your topic</h4>
                <ul className="topics">{ items }</ul>
            </div>        
        )
    }
}