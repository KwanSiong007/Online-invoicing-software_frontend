import "./App.css";
import ResponsiveAppBar from "./components/Navbar";
import Business from "./pages/Business";
import Invoice from "./pages/Invoice";
import Contacts from "./pages/Contacts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const routes = [
  { path: "/Business", element: <Business /> },
  { path: "/Invoice", element: <Invoice /> },
  { path: "/Contacts", element: <Contacts /> },
];

function App() {
  return (
    <Router>
      <ResponsiveAppBar />
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
