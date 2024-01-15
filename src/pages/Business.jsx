import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Business() {
  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
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
}
export default Business;
