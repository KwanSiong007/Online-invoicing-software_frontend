// add "New contact" button
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
