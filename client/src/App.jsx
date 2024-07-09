import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useContext } from "react";
import axios from "axios";
import { AdminContext, AdminProvider } from "./Context/AdminContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import StudentList from "./Components/dashboard/StudentList";
import NewEntry from "./Components/dashboard/NewEntry";
import BlockList from "./Components/dashboard/BlockList";
import Accounts from "./Components/dashboard/Accounts";
import Password from "./Components/dashboard/Password";
import Protected from "./Components/Protected";
import { ContexProvider } from "./Context/Context";

const AppContent = () => {
  const { dispatch } = useContext(AdminContext);

  useEffect(() => {
    axios
      .get("/server/api/admin/get")
      .then((res) => {
        dispatch({ type: "LOGIN", payload: res.data.data });
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <Protected auth={false}>
              <Login />
            </Protected>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <Protected auth={true}>
              <Dashboard />
            </Protected>
          }
        >
          <Route index element={<StudentList />} />
          <Route path="students" element={<StudentList />} />
          <Route path="newEntry" element={<NewEntry />} />
          <Route path="blockList" element={<BlockList />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="password" element={<Password />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default function App() {
  return (
    <ContexProvider>
      <AdminProvider>
        <AppContent />
      </AdminProvider>
    </ContexProvider>
  );
}
