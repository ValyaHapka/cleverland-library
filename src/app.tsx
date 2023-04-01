/* eslint-disable import/no-default-export */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Auth } from './pages/auth';
import { BookPage } from './pages/book';
import { ForgotPassword } from './pages/forgot-password/forgot-password';
import { MainPage } from './pages/main';
import { Register } from './pages/register';
import { Rules } from './pages/rules';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path='/books/:category' element={<MainPage />} />
          <Route path='/books/:category/:bookID' element={<BookPage />} />
          <Route path='/rules' element={<Rules />} />
          <Route path='/offer' element={<Rules />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/registration' element={<Register />} />
          <Route path='/forgot-pass' element={<ForgotPassword />} />
          <Route path='*' element={<Navigate to='/books/all' replace={true} />} />
        </Routes>
      </HashRouter>
    </Provider>
  );
}
export default App;
