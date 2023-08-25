import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Authentication from './pages/Authentication';
import Home from "./pages/Home";
import Racipe from './pages/Recipe';

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Authentication />}/> 
        <Route path='/home' element={<Home />}  />   
        <Route path='/recipe/:id' element={<Racipe />}  />   
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
