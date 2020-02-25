import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import generateStore from "./redux/store";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import App from "./App";
import Theme from "./components/commons/Theme";

let store = generateStore();

let AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
let AppWithStore = () => (
  <Provider store={store}>
    <AppWithRouter />
  </Provider>
);
let AppWithMUI = () => (
  <ThemeProvider theme={Theme}>
    <CssBaseline />
    <AppWithStore />
  </ThemeProvider>
);

ReactDOM.render(<AppWithMUI />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
