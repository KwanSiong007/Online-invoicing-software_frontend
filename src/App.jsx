import ResponsiveAppBar from "./components/Navbar";
import Business from "./pages/Business";
import Invoice from "./pages/Invoice";
import NewContact from "./pages/NewContact";
import Contacts from "./pages/Contacts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";

// Define the route components with authentication required
const AuthenticatedBusiness = withAuthenticationRequired(Business);
const AuthenticatedInvoice = withAuthenticationRequired(Invoice);
const AuthenticatedContacts = withAuthenticationRequired(Contacts);
const AuthenticatedNewContact = withAuthenticationRequired(NewContact);

function App() {
  return (
    <Router>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<AuthenticatedBusiness />} />
        <Route path="/Invoice" element={<AuthenticatedInvoice />} />
        <Route path="/Contacts" element={<AuthenticatedContacts />} />
        <Route path="/Contacts/add" element={<AuthenticatedNewContact />} />
      </Routes>
    </Router>
  );
}

export default App;
