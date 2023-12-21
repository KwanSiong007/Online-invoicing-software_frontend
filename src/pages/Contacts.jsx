//todo: use useEffect hook to send API request to server & useState hook to sets the state variable to the data received from the backend server
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Contacts() {
  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
  };
  return (
    <div style={{ margin: "10px 10px" }}>
      <Button variant="outlined">
        <Link to="/Contacts/add" style={linkStyle}>
          {"New Contact"}
        </Link>
      </Button>
    </div>
  );
}
export default Contacts;
