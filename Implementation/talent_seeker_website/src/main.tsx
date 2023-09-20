import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./index.css";
import ErrorPage from "./pages/error_page";
import Root from "./routes/root";
import SearchPageHome from "./pages/search_page_home";
import { Provider } from 'react-redux';
import store from './redux/store/store';
import ResourceListPage from "./pages/resource_list_page";
// import Root from "src/routes/root";
// import ErrorPage from "src/pages/error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement : <ErrorPage/>,
    children : [
      {
        path: "searchPageHome",
        element : <SearchPageHome></SearchPageHome>
      },
      {
        path: "resourceList",
        element : <ResourceListPage></ResourceListPage>
      }
      
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    
  </React.StrictMode>
);