import {NextPageContext} from "next";
import fetchRepos from "../api/fetchRepos";

export default function storeJson() {
    return null
}

storeJson.getInitialProps = async (ctx: NextPageContext) => {
    const repos = await fetchRepos()
    ctx.res?.setHeader('Content-Type', 'application/json; charset=utf-8');
    ctx.res?.write(JSON.stringify(repos));
    ctx.res?.end();
    return {}; // it never reaches here but required as getInitialProps need to return object.
}
