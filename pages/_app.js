import App from "next/app";
import fetch from "isomorphic-unfetch";
import { withFetchHar } from "../src/index";

export default withFetchHar(App, { fetch });
