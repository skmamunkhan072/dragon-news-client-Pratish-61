import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import Profile from "../../Other/Profile/Profile";
import TermsAndCondition from "../../Other/TermsAndCondition";
import Category from "../../Pages/Category/Category/Category";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login/Login";
import Register from "../../Pages/Login/Register/Register";
import News from "../../Pages/News/News/News";
import PrivetRoute from "./PrivetRoute";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () =>
          fetch(
            "https://dragon-news-server-module-60-mhbj61xm8-skmamunkhan072.vercel.app/news"
          ),
      },
      {
        path: "/category/:id",
        element: <Category></Category>,
        loader: ({ params }) =>
          fetch(
            `https://dragon-news-server-module-60-mhbj61xm8-skmamunkhan072.vercel.app/category/${params.id}`
          ),
      },
      {
        path: "/news/:id",
        element: (
          <PrivetRoute>
            <News></News>
          </PrivetRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://dragon-news-server-module-60-mhbj61xm8-skmamunkhan072.vercel.app/news/${params.id}`
          ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "*",
        element: <Login />,
      },
      {
        path: "/terms",
        element: <TermsAndCondition />,
      },
      {
        path: "/profile",
        element: (
          <PrivetRoute>
            <Profile />
          </PrivetRoute>
        ),
      },
    ],
  },
]);
