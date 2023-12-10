// it has "New invoice" button
// shows all, awaiting payment & paid invoice
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Business() {
  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  return (
    <div style={{ margin: "10px 10px" }}>
      <Button variant="outlined">
        <Link to="/Invoice" style={linkStyle}>
          {"New Invoice"}
        </Link>
      </Button>
    </div>
  );
}
export default Business;
