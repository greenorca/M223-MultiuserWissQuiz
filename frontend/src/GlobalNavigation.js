import React from 'react';
import { Link } from 'react-router-dom';

class GlobalNavigation extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/quiz">Quiz</Link>
              </li>
              <li>
                <Link to="/rules">Rules</Link>
              </li>
              <li>
                <Link to="/questionslist">Questions</Link>
              </li>
              <li>
                <Link to="/aboutus">About Us</Link>
              </li>
            </ul>
          </nav>
        )
    }
}

export default GlobalNavigation;