import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Connections from './pages/Connections';
import Feed from './pages/Feed';
import Login from './pages/Login';
import MainLayout from './components/templates/MainLayout';
import Profile from './pages/Profile';
import ProtectedRoute from './utils/ProtectedRoute';
import { Provider } from 'react-redux';
import RequestReview from './pages/RequestReview';
import appStore from './utils/appStore';

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<Navigate to='/login' />} />
            <Route path='/login' element={<Login />} />
            <Route
              path='/feed'
              element={
                <ProtectedRoute>
                  <Feed />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path='/connections'
              element={
                <ProtectedRoute>
                  <Connections />
                </ProtectedRoute>
              }
            />
            <Route
              path='/request-review'
              element={
                <ProtectedRoute>
                  <RequestReview />
                </ProtectedRoute>
              }
            />

            <Route path='*' element={<Navigate to='/login' />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
