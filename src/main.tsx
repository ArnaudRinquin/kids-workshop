import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./screens/home";
import Kids from "./screens/kids";
import Kid from "./screens/kid";
import Workshops from "./screens/workshops";
import Workshop from "./screens/workshop";
import { Settings } from "./screens/settings";
import { CacheManager } from "./screens/cache-manager";

const basename = import.meta.env.KW_BASENAME ?? "/";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/kids",
      element: <Kids />,
    },
    {
      path: "/kids/:kidId",
      element: <Kid />,
    },
    {
      path: "/workshops",
      element: <Workshops />,
    },
    {
      path: "/workshops/:workshopId",
      element: <Workshop />,
    },
    {
      path: "/settings",
      element: <Settings />,
    },
    {
      path: "/settings/cache",
      element: <CacheManager />,
    },
  ],
  {
    basename,
  }
);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
