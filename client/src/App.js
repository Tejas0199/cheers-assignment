import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar';
import MovieList from './component/MovieList';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <MovieList/>
    </div>
  );
}

export default App;
