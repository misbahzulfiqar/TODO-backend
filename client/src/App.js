import User from './getUser/user.jsx';
import AddUser from './addUser/addUser.jsx';
import UpdateUser from './updateUser/update.jsx';

import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User />,
    },
    {
      path: "/add",
      element: <AddUser />,
    },
        {
      path: "/update/:id",
      element: <UpdateUser />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;