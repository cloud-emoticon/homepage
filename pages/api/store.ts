import { NextApiRequest, NextApiResponse } from "next";
import Cors from 'cors'
import fetchRepos from "../../api/fetchRepos";

// https://github.com/vercel/next.js/blob/canary/examples/api-routes-cors/pages/api/cors.ts
const cors = Cors({
    methods: ['POST', 'GET', 'HEAD'],
  })
  
// https://github.com/vercel/next.js/blob/canary/examples/api-routes-cors/pages/api/cors.ts
function runMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    fn: Function
) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await runMiddleware(req, res, cors)

    const repos = await fetchRepos()
    res.status(200).json(repos)
}
