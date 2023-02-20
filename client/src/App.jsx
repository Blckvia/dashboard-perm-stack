import HomePage from './pages/HomePage/HomePage';
import Login from './pages/login/Login';
import List from './pages/list/List';
import Single from './pages/single/Single';
import New from './pages/new/New';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={ <HomePage/> } />
            <Route path='login' element={ <Login/> } />
            <Route path='users'>
              <Route index element={ <List /> } />
              <Route path=':userId' element={ <Single /> } />
              <Route path='new' element={ <New /> } />
            </Route>
            <Route path='books'>
              <Route index element={ <List /> } />
              <Route path=':bookId' element={ <Single /> } />
              <Route path='new' element={ <New /> } />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
