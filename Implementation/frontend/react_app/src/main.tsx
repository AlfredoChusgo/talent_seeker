import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { appConfig } from "./config/config_helper.ts";

import "./index.css";
import ErrorPage from "./pages/error_page";
import Root from "./routes/root";
import SearchPageHome from "./redux/features/search_home/search_page_home_page";
import { Provider } from 'react-redux';
import store from './redux/store/store';
import ResourceListPage from "./redux/features/resource_list/resource_list_page";
import TeamBuilderPage from "./redux/features/team_builder/team_build_page";
import SnackbarComponent from "./redux/components/snackbar_component.tsx";
import TeamsPage from "./redux/features/teams/teams_page.tsx";
import './languajes/languaje_config.ts';
import { DialogComponent } from "./redux/dialogs/dialog_component.tsx";
import SkillsPage from "./redux/features/skills/skills_page.tsx";
import RolesPage from "./redux/features/roles/roles_page.tsx";
import ResourcesPage from "./redux/features/resources/resources_page.tsx";
import { ThemeProvider } from '@mui/material/styles';
import theme from "./config/theme.ts";

const routes = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <SearchPageHome></SearchPageHome>
      },
      {
        path: "searchPageHome",
        element: <SearchPageHome></SearchPageHome>
      },
      {
        path: "resourceList",
        element: <ResourceListPage></ResourceListPage>
      },
      {
        path: "teamBuilder",
        element: <TeamBuilderPage></TeamBuilderPage>
      },
      {
        path: "teams",
        element: <TeamsPage></TeamsPage>
      },
      {
        path: "skills",
        element: <SkillsPage></SkillsPage>
      },
      {
        path: "roles",
        element: <RolesPage></RolesPage>
      },
      {
        path: "resources",
        element: <ResourcesPage></ResourcesPage>
      }


    ]
  },
];
const router = createBrowserRouter(routes,{basename:"/talent_seeker"});



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
        <SnackbarComponent />
        <DialogComponent />
      </ThemeProvider>

    </Provider>
  </React.StrictMode>
);