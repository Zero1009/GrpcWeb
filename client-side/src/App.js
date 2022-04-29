import Appbar from './components/nav/Appbar';
import Home from './components/once_invoke/Home';
import DataDriven from './components/data_driven_page/DataDriven';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Appbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/dataDriven' element={<DataDriven />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
