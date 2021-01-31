import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './screens/Dashboard';
import InterestForm from './screens/InterestForm';
import Recommendations from './screens/Recommendations';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/Dashboard" exact render={() => <Dashboard />} />
        <Route path="/InterestForm" exact render={() => <InterestForm />} />
        <Route path="/Recommendations" exact render={() => <Recommendations />} />
      </Router>
    </div>
  );
}

export default App;
