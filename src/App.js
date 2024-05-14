import Header from './components/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import AllRoute from './AllRoute';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    <div className="container">
      <Router>
        <Header />
        <section className="mt-4 py-3">
          <div className="row ">
            <AllRoute />

          </div>
        </section>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
