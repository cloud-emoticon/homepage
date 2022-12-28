import {GetServerSideProps, InferGetServerSidePropsType} from 'next'
import {Repository} from "../api/api";
import fetchRepos from "../api/fetchRepos";
import {Avatar, Button, Card, CardActions, CardContent, Stack, Typography} from "@mui/material";
import React from "react";
import Link from "@mui/material/Link";
import Head from "next/head";

interface ServerSideProps {
    repos: Repository[]
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context) => {
    const repos = await fetchRepos();
    return {
        props: {
            repos
        }
    }
}

export default function Store({ repos }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            <Head>
                <title>源商店</title>
            </Head>
            <Stack
                direction='column'
                spacing={2}
                paddingBottom={2}
            >
                {
                    repos.map(repo => {
                        return (
                            <Card key={repo.name} sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Link href={repo.creatorurl}>
                                        <Stack
                                            direction='row'
                                            alignItems='center'
                                            spacing={1}
                                        >
                                            <Avatar
                                                alt={repo.creator}
                                                src={repo.iconurl}
                                                sx={{ width: 18, height: 18 }}
                                            />
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                {repo.creator}
                                            </Typography>
                                        </Stack>
                                    </Link>
                                    <Typography variant="h5" component="div">
                                        {repo.name}
                                    </Typography>
                                    <Typography variant="body2">
                                        {repo.introduction}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Add to iOS app</Button>
                                    <Button size="small">Repo source</Button>
                                </CardActions>
                            </Card>
                        )
                    })
                }
            </Stack>
        </>

    )
}
