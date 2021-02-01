import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './screens/Dashboard';
import InterestForm from './screens/InterestForm';
import Recommendations from './screens/Recommendations';
import Logo from './assets/logo.png';

function App() {
  return (
    <div className="App">
      <Router>
        <img src={Logo} style={{width: '15%', margin: '3%', marginBottom: '-2%'}} />
        <Route path="/Dashboard" exact render={() => <Dashboard />} />
        <Route path="/InterestForm" exact render={() => <InterestForm />} />
        <Route path="/Recommendations" exact render={() => <Recommendations />} />
      </Router>
    </div>
  );
}

export default App;
