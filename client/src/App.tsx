import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Dashboard, Login, Products } from "./pages";
import { Topbar } from "./components/layout/Topbar";
import { Sidebar } from "./components/layout/Sidebar";
import { ToastContainer,  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
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
                    </Routes>
                  </main>
                </div>
              </div>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
