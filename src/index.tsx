import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LogInPade } from './pages/LogInPage';
import { ThemeContextProvider } from './components/helpers/styles/ThemeContextProvider';
import { PrivateRoute } from './components/Auth/PrivateRoute';
import { RefreshUser } from './components/Auth/RefreshUser';
import { Layout } from './components/Layout';
import { FeedPage } from './pages/FeedPage';
import { ChatPage } from './pages/ChatPage';

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
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/feeds" replace />
      },
      {
        path: "feeds",
        element: <PrivateRoute children={<HomePage />} />
      },
      {
        path: "feeds/:id",
        element: <PrivateRoute children={<FeedPage />} />
      },
      {
        path: "feeds/chat",
        element: <PrivateRoute children={<ChatPage />} />
      },
    ]
  },
  {
    path: "*",
    element: <Navigate to="/feeds" replace />,
  },
]);

root.render(
  <React.StrictMode>
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
  </React.StrictMode>
);