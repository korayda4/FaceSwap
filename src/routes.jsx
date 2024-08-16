import { createBrowserRouter } from "react-router-dom";
import MainPage from "./MainPage";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />,
    },
    {
        path: '/swap/:id',
        element: <MainPage />,
    }
]);
