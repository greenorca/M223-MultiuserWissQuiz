import './App.css';
import {
  Routes,
  Route,
  Outlet
} from 'react-router-dom'

import GameSession from './GameSession.js'
import Home from './Home.js';
import Rules from './Rules.js';
import AboutUs from './AboutUs.js';
import NotFound from './NotFound';
import GlobalNavigation from './GlobalNavigation';
import QuestionList from './QuestionList';

function App(props) {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="quiz" element={<GameSession />} />
        <Route path="rules" element={<Rules />} />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="questionslist" element={<QuestionList />} />
      </Route>
      <Route path="*" element={<NotFound />}/>
    </Routes>
  );
}

function Layout(){
  return (
    <div className="App">
      <GlobalNavigation />
      <div className="content">
        <header className="App-header">
          <h1>Welcome to the Wiss-Quiz</h1>
          <hr/>
          <Outlet />
          <hr/>
        </header>
      </div>
    </div>
  );
}

export default App;
