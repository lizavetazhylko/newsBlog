import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Activation } from './components/activation/Activation';
import { Articles } from './components/arcticles/Articles';
import { Header } from './components/header/Header';
import { SignIn } from './components/signin/SignIn';
import { SignUp } from './components/signup/SignUp';
import { getUser } from './redux/action_creators';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Menu } from './components/menu/Menu';
import { Blogs } from './components/blogs/Blogs';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('jwtAccess');
    if (token) {
      dispatch(getUser());
    } else {
      const { pathname } = window.location;
      if (pathname !== '/signin' && pathname !== '/signup') {
        window.location.href = '/signin';
      }
    }
  }, [localStorage.getItem('jwtAccess')]);

  return (
    <div className="App">
      <Header />
      <Menu />
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element = {
              <div>
                  <h1>home page</h1>
                  <nav>
                    <Link to='/'>Home</Link>
                    <Link to='signup'>SignUp</Link>
                    <Link to='signin'>SignIn</Link>
                  </nav>
              </div>} 
            />
            <Route path='signin' element={<SignIn />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='activate'>
               <Route path='*' element={<Activation />}  />
            </Route>
            <Route path='articles/' element={<Articles />} />
            <Route path='blogs/' element={<Blogs />} />         
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;