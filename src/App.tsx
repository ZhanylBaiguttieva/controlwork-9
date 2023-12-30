
import './App.css';
import {Route, Routes} from 'react-router-dom';
import ToolBar from './components/ToolBar/ToolBar';
import EditCategory from './components/Categories/EditCategory';
import Transactions from './components/Transactions/Transactions';
import Categories from './components/Categories/Categories';
import NewTransaction from './components/TransactionForm/NewTransaction';

function App() {

  return (
    <ToolBar>
      <Routes>
        <Route path="/categories" element={(<Categories/>)}></Route>
        <Route path="/" element={(<Transactions/>)}></Route>
        <Route path="/new-transaction" element={(<NewTransaction/>)}></Route>
        <Route path="/edit-category/:id" element={<EditCategory/>}/>
        <Route path="*" element={(<h1>Not Found!</h1>)}/>
      </Routes>
    </ToolBar>
  );
}

export default App;
