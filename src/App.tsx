
import './App.css';
import {Route, Routes} from 'react-router-dom';
import Categories from './components/Categories';

function App() {

  return (
    <>
      <Routes>
        <Route path="/categories" element={(<Categories/>)}></Route>
      </Routes>
    </>
  );
}

export default App;
