import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from './components/header/header.component';
import DashBoard from './pages/dashboard/dashboard-page.component';
import SideNav from './components/sidenav/sidenav.component';
import CountrywiseStats from './pages/country-wise-stats/country-wise-stats-page.component';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <SideNav />
        <div className="page-content">
          <Switch>
            <Route exact path="/covid-dashboard/" component={DashBoard} />
            <Route path="/covid-dashboard/countrywise-stats" component={CountrywiseStats} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
