import { createBrowserRouter } from "react-router-dom";
import MainPage from "./MainPage";
import SwapFace from "./SwapFacePage";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />,
    },
    {
        path: '/swap',
        element: <SwapFace />,
    }
]);
