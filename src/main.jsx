import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

//ReactDOM.createRoot(document.getElementById("root")).render(<App />);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain={import.meta.env.VITE_APP_DOMAIN}
    clientId={import.meta.env.VITE_APP_CLIENT_ID}
    redirect_uri={window.location.origin}
    audience={import.meta.env.VITE_APP_AUDIENCE}
    scope="read:current_user update:current_user_metadata"
  >
    <App />
  </Auth0Provider>
);

/*<Auth0Provider
    domain={import.meta.env.REACT_APP_DOMAIN}
    clientId={import.meta.env.REACT_APP_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: import.meta.env.REACT_APP_AUDIENCE,
      scope: "read:current_user update:current_user_metadata",
    }}
  ></Auth0Provider>*/
