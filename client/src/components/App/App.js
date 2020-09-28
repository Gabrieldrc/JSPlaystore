import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.css';
import RegisterPage from '../RegisterPage/RegisterPage';
import Nav from '../Nav/Nav';
import Store from '../Store/Store';
import NewAppForm from '../NewAppForm/NewAppForm';
import Title from '../Title/Title';

const headerConteinerStyle = {
  gridArea: "header",
  minHeight: "10vh",
  backgroundColor: "black",
};

const bodyConteinerStyle = {
  gridArea: "body",
  minHeight: "90vh",
  backgroundColor: "rgb(50, 50, 50)",
};

const bodyContentStyle = {
  maxWidth: "1600px",
  margin: "auto",
};

function App() {
  return (
    <Router>
      <div className="App">
        <div style={headerConteinerStyle}>
          <Nav />
        </div>
        <div style={bodyConteinerStyle}>
          <div style={bodyContentStyle}>
            <Switch>
              <Route exact path="/">
                <RegisterPage />
              </Route>
              <Route exact path="/store">
                <Store />
              </Route>
              <Route exact path="/sell">
                <div>
                  <Title>Upload an app</Title>
                  <NewAppForm />
                </div>
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
