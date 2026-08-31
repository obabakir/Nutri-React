import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter as Router } from "react-router-dom";

// @ts-ignore: allow importing CSS for side effects when no .d.ts is provided
import "./css/index.css";
import theme from "./app/MaterialTheme";
import ContexProvider from "./app/contex/ContexProvider";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ContexProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <App />
          </Router>
          <CssBaseline />
        </ThemeProvider>
      </ContexProvider>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
