import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LogInPade } from './pages/LogInPage';
import { PrivateRoute } from './components/PrivateRoute';
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
    path: "/feeds",
    element: <PrivateRoute children={<HomePage /> }/>
  },
  {
    path: "*",
    element: <Navigate to="/feeds" replace/>,
  }
])

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RefreshUser>
          <ThemeContextProvider>
            <RouterProvider router={router} />
          </ThemeContextProvider>
        </RefreshUser>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  // </React.StrictMode>
);