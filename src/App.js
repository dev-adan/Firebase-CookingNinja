import './App.css';
import {Recipe,Home,Create,Search} from './pages';
import { Navbar } from './components';
import { Routes,Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
    <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/create' element={<Create/>} />
      <Route path='/search' element={<Search/>} />
      <Route path='/recipes/:id' element={<Recipe/>} />
     </Routes>
    </div>
  );
}

export default App;
