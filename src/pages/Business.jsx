// it has "New invoice" button
// shows all, awaiting payment & paid invoice
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function Business() {
  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  const { loginWithRedirect, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return (
      <div style={{ margin: "10px 10px" }}>
        {/* <Button variant="outlined">
          <Link to="/Invoice" style={linkStyle}>
            {"New Invoice"}
          </Link>
        </Button> */}
        <button onClick={() => loginWithRedirect()}>Log In</button>
      </div>
    );
  }
}
export default Business;
