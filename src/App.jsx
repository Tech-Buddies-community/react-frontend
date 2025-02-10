import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";

// component
import PublicLayout from "./layouts/PublicLayout";
import HomeView from "./pages/HomeView";
import EventView from "./pages/EventView";
import DetailEventView from "./pages/DetailEventView";
import UpdateEventView from "./pages/UpdateEventView";
import UpdateProgramView from "./pages/UpdateProgramView";
import ProgramView from "./pages/ProgramView";
import DetailProgramView from "./pages/DetailProgramView";
import JobView from "./pages/JobView";
import DetailJobView from "./pages/DetailJobView";
import LoginView from "./pages/auth/LoginView";
import RegisterView from "./pages/auth/RegisterView";
import CreateEventView from "./pages/CreateEventView";
import CreateProgramView from "./pages/CreateProgramView"

// Loader
import { loader as EventLoader } from "./pages/EventView";
import { loader as ProgramLoader } from "./pages/ProgramView";
import { loader as JobLoader } from "./pages/JobView";
import { loader as CreateEvent } from "./pages/CreateEventView"
import { loader as CreateProgram } from "./pages/CreateProgramView"

// Action
import { action as LoginAction } from "./pages/auth/LoginView";
import { action as RegisterAction } from "./pages/auth/RegisterView";

// Storage
import { store } from "./store.js";

// Error component
import ErrorView from "./components/ErrorView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <ErrorView />,
    children: [
      {
        index: true,
        element: <HomeView />
      },
      {
        path: 'event/create',
        element: <CreateEventView />,
        loader: CreateEvent(store)
      },
      {
        path: 'event',
        element: <EventView />,
        loader: EventLoader
      },
      {
        path: 'event/:id',
        element: <DetailEventView />
      },
      {
        path: 'event/:id/update',
        element: <UpdateEventView />
      },
      {
        path: 'program/create',
        element: <CreateProgramView />,
        loader: CreateProgram(store)
      },
      {
        path: 'program',
        element: <ProgramView />,
        loader: ProgramLoader
      },
      {
        path: 'program/:id',
        element: <DetailProgramView />,
      },
      {
        path: 'program/:id/update',
        element: <UpdateProgramView />,
      },
      {
        path: 'job',
        element: <JobView />,
        loader: JobLoader
      },
      {
        path: 'job/:id',
        element: <DetailJobView />,
      },
    ]
  },
  {
    path: 'login',
    element: <LoginView />,
    action: LoginAction(store)
  },
  {
    path: 'register',
    element: <RegisterView />,
    action: RegisterAction(store)
  }
]);

function App(){
  return <RouterProvider router={router} />
};

export default App;