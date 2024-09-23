import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomeScreen from './screens/HomeScreen.jsx';
import Login from './screens/Login.jsx';
import Register from './screens/Register.jsx';
import AddRecord from './screens/AddRecord.jsx';
import AdminRecordList from './screens/AdminRecordList.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import RecordDetails from './screens/RecordDetailsPage.jsx';
import EditRecord from './screens/EditRecord.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen/>
  },

  {
    path: "/login",
    element: <Login/>
  },

  {
    path: "/register",
    element: <Register/>
  },

  {
    path: "/addrecord",
    element: <AddRecord/>
  },

  {
    path: "/editrecord/:id",
    element: <EditRecord/>
  },

  {
    path:"/record/:id",
    element:<RecordDetails/>
  },


  {
    path: "/adminrecords",
    element: <AdminRecordList/>
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
     
  </React.StrictMode>,
)
