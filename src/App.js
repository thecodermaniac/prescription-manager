import './App.css';
import NavBar from './components/NavBar';
import PresState from './context/prescimages/imagestate'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './components/Login';
import DashBoard from './components/DashBoard';
import Signup from './components/Signup';

function App() {
  return (
    <>
      <PresState>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/dashboard">
              <DashBoard />
            </Route>
            <Route exact path="/login">
            <Login/>
            </Route>
            <Route exact path="/signup">
            <Signup/>
            </Route>
          </Switch>
        </Router>
      </PresState>

    </>
  );
}

export default App;
