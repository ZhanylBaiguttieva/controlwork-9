
import './App.css';
import {Route, Routes} from 'react-router-dom';
import ToolBar from './components/ToolBar/ToolBar';
import EditCategory from './components/Categories/EditCategory';

function App() {

  return (
      <Routes>
        <Route path="/categories" element={(<ToolBar/>)}></Route>
        <Route path="/edit-category/:id" element={<EditCategory/>}/>

        {/*<Route path="/new-category" element={(<NewDish/>)} />*/}
        {/*<Route path="/edit-category/:id" element={<EditDish/>}/>*/}
        <Route path="*" element={(<h1>Not Found!</h1>)}/>
      </Routes>
  );
}

export default App;
