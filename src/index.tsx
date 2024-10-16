import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LogInPade } from './pages/LogInPage';
import { PrivateRoute } from './components/PrivateRoute';
import { PersistGate } from 'redux-persist/es/integration/react';
import { RefreshUser } from './components/RefreshUser';
import { ThemeContextProvider } from './components/ThemeContextProvider';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LogInPade />
  },
  {
    path: "/",
    element: <PrivateRoute children={<HomePage /> }/>
  },
  {
    path: "*",
    element: <Navigate to="/" replace/>,
  }
])

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <RefreshUser>
            <ThemeContextProvider>
              <RouterProvider router={router} />
            </ThemeContextProvider>
          </RefreshUser>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);