import {NextApiRequest, NextApiResponse} from "next";
import fetchRepos from "../../api/fetchRepos";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    fetchRepos()
        .then(repos => res.status(200).json(repos))
        .catch(_ => res.status(500).json([]));
}

export default handler;
