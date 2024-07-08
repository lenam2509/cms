import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Dashboard, Login, Products, UserInfo, Users } from "./pages";
import { Topbar } from "./components/layout/Topbar";
import { Sidebar } from "./components/layout/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        <BrowserRouter>
          <ToastContainer position="top-center" closeOnClick />
          <Routes>
            <Route
              path="*"
              element={
                <div className="flex">
                  <Sidebar />
                  <div className="w-full">
                    <Topbar />
                    <main className="p-4">
                      <Routes>
                        <Route index element={<Dashboard />} />
                        <Route path="products" element={<Products />} />
                        <Route path="users" element={<Users />} />
                        <Route path="user-info" element={<UserInfo />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
