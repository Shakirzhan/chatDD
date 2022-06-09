import * as React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { ConnectedRouter } from 'react-router-redux';
import { BrowserRouter } from "react-router-dom";

import store from "./redux/store";
// import { history } from "./redux/history";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

const theme = createTheme();

root.render(
  <Provider store={store}>
    {/* <ConnectedRouter history={history}> */}
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </ThemeProvider>
    {/* </ConnectedRouter> */}
  </Provider>
);
