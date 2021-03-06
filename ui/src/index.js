import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import App from "./App";
import WrappHistory from "./components/WrappHistory";

const theme = createTheme();

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <BrowserRouter>
          <WrappHistory Component={App} />
        </BrowserRouter>
      </React.StrictMode>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

