import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Test from "@components/Test";
import { MyLoader } from "./loader/test.loader";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 25,
    },
  },
});

const routers = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <div>something wrong</div>,
    children: [
      {
        index: true,
        element: <div>default element</div>,
      },
      {
        path: "test",
        element: <Test />,
        loader: MyLoader(queryClient),
      },
    ],
  },
]);

function DefaultLayout() {
  return (
    <div>
      <div>headers</div>
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <>
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={routers} />
        </QueryClientProvider>
      </div>
    </>
  );
}
