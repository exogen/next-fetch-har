import App from "next/app";
import fetch from "isomorphic-unfetch";
import { withFetchHar } from "../src/index";

let CustomApp = App;

if (process.env.NODE_ENV !== "production") {
  CustomApp = withFetchHar(App, { fetch });
}

export default CustomApp;
