import {Box, Button, Grid, IconButton, Modal, Stack, Typography} from "@mui/material";
import Link from '@mui/material/Link';
import CodeIcon from '@mui/icons-material/Code';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import React, {useEffect, useState} from "react";
import Image from 'next/image';
// @ts-ignore
import platform from 'platform-detect'

interface Author {
    name: string,
    url: string
}

interface App {
    name: string,
    downloadUrl?: string,
    sourceCodeUrl: string,
    authors: Author[],
    experimental?: boolean,
}

interface Platform extends App {
    _platformDetectName: string
    alternativeApp?: App,
}

const WebPlatform: Platform = {
    _platformDetectName: '',
    name: 'Web',
    sourceCodeUrl: 'https://github.com/cloud-emoticon/cloudemoticon-web',
    downloadUrl: 'https://web.emoticon.moe',
    authors: [{
        name: 'KTachibanaM',
        url: 'https://twitter.com/KTachibana_M'
    }],
    experimental: true,
}

const AllPlatforms: Platform[] = [
    {
        _platformDetectName: 'android',
        name: 'Android',
        downloadUrl: 'https://play.google.com/store/apps/details?id=org.ktachibana.cloudemoji',
        sourceCodeUrl: 'https://github.com/cloud-emoticon/cloudemoticon-android',
        authors: [{
            name: 'KTachibanaM',
            url: 'https://twitter.com/KTachibana_M'
        }],
        alternativeApp: {
            name: 'Sony Small App',
            sourceCodeUrl: 'https://github.com/cloud-emoticon/SmallCloudEmoji',
            authors: [{
                name: 'Shell Chen',
                url: 'https://github.com/sorz/'
            }]
        }
    },
    {
        _platformDetectName: 'ios',
        name: 'iOS',
        downloadUrl: 'https://itunes.apple.com/cn/app/yun-yan-wen-zi-cloud-emoticon/id796508155?mt=8',
        sourceCodeUrl: 'https://github.com/cloud-emoticon/CloudEmoticon1iOS',
        authors: [
            {
                name: '神楽坂雅诗',
                url: 'https://twitter.com/kagurazakayashi'
            },
            {
                name: '神楽坂紫',
                url: 'https://twitter.com/kzyakumoyukari'
            },
        ]
    },
    {
        _platformDetectName: 'windows',
        name: 'Windows',
        downloadUrl: 'https://github.com/cloud-emoticon/cloudemoticon-web/releases',
        sourceCodeUrl: 'https://github.com/cloud-emoticon/cloudemoticon-web',
        authors: [{
            name: 'KTachibanaM',
            url: 'https://twitter.com/KTachibana_M'
        }],
        experimental: true,
        alternativeApp: {
            name: '原生 Windows',
            sourceCodeUrl: 'https://github.com/kinosang/cloudEmoji_win',
            authors: [{
                name: 'Chino Chang',
                url: 'https://github.com/kinosang',
            }],
        }
    },
    WebPlatform,
    {
        _platformDetectName: '',
        name: 'Windows Phone',
        sourceCodeUrl: 'https://github.com/yume-chan/cloud-emoticon-net',
        authors: [
            {
                name: "Simon Chan",
                url: 'https://github.com/yume-chan'
            }
        ]
    }
]

const _platformByPlatformDetectName: { [key: string]: Platform | undefined } = Object.fromEntries(AllPlatforms.map(p => {
    return [p._platformDetectName, AllPlatforms.find(_p => _p._platformDetectName === p._platformDetectName)]
}))

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function Home() {
    const [detectedPlatform, setDetectedPlatform] = useState<Platform | undefined>(undefined)
    const [modalOpen, setModalOpen] = useState(false);
    const onModalClose = () => setModalOpen(false);

    useEffect(() => {
        if (platform.android) {
            setDetectedPlatform(_platformByPlatformDetectName['android']);
        } else if (platform.ios) {
            setDetectedPlatform(_platformByPlatformDetectName['ios']);
        } else if (platform.windows) {
            setDetectedPlatform(_platformByPlatformDetectName['windows']);
        } else {
            setDetectedPlatform(WebPlatform);
        }
    }, [])

    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{minHeight: '90vh'}}
        >
            <Grid item xs={3}>
                <Stack
                    direction="column"
                    alignItems="flex-start"
                    spacing={1}
                >
                    <Typography variant="h4" component="div">
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems='center'
                        >
                            <Image src="/icon.png" width={48} height={48} alt="cloud emoticon icon" />
                            <span>云颜文字</span>
                        </Stack>
                    </Typography>
                    <Typography variant="h6" display="div">
                        {"您的颜文字 ლ(╹◡╹ლ) ( っ*'ω'*c) (っ╹ ◡ ╹ )っ💊 ╮( ๑╹,◡╹ ๑) ╭ ( っ´ω`c)♡ ю┐(ԾωԾ) 伴侣"}
                    </Typography>
                    {detectedPlatform ?
                        <Stack
                            direction="row"
                            alignItems='center'
                        >
                            <Link
                                href={detectedPlatform.downloadUrl ? detectedPlatform.downloadUrl : detectedPlatform.sourceCodeUrl}>
                                <Button
                                    variant="contained"
                                    size='large'
                                >
                                    {`${detectedPlatform.downloadUrl ? '' : '尚未正式发布，自行编译'} ${detectedPlatform.name} 版`}
                                </Button>
                            </Link>
                            {detectedPlatform && detectedPlatform.downloadUrl &&
                                <Link href={detectedPlatform.sourceCodeUrl}>
                                    <IconButton size='large'>
                                        <CodeIcon/>
                                    </IconButton>
                                </Link>
                            }
                            
                        </Stack> :
                        <CircularProgress />
                    }
                    {detectedPlatform && detectedPlatform.experimental &&
                        <Chip size="small" label="实验版" color="warning"/>
                    }
                    {
                        detectedPlatform && detectedPlatform.authors &&
                            <Typography variant="caption" display="block">
                                开发者 {detectedPlatform?.authors.map(author => {
                                return (
                                    <span key={author.url}>
                                        <Link href={author.url}>{author.name}</Link>
                                        <span>{' '}</span>
                                    </span>
                                )
                            })}
                            </Typography>
                    }
                    {
                        detectedPlatform && detectedPlatform.alternativeApp &&
                            <Typography variant="caption" display="block">
                                你也可以{detectedPlatform.alternativeApp.downloadUrl ? '试试' : '自行编译'} {detectedPlatform.alternativeApp.authors.map(author => {
                                    return (
                                        <span key={author.url}>
                                            <Link href={author.url}>{author.name}</Link>
                                            <span>{' '}</span>
                                        </span>
                                    )
                                })} 的
                                <Link
                                    href={detectedPlatform.alternativeApp.downloadUrl ? detectedPlatform.alternativeApp.downloadUrl : detectedPlatform.alternativeApp.sourceCodeUrl}
                                >
                                    {detectedPlatform.alternativeApp.name} 版
                                </Link>
                                {
                                    detectedPlatform.alternativeApp.downloadUrl &&
                                        <Link href={detectedPlatform.alternativeApp.sourceCodeUrl}>
                                            <IconButton size='small'>
                                                <CodeIcon/>
                                            </IconButton>
                                        </Link>
                                }
                            </Typography>
                    }
                    <Link
                        href='#'
                        onClick={e => {
                            e.preventDefault()
                            setModalOpen(true)
                        }}
                    >
                        <Typography variant="caption" display="block">
                            所有平台
                        </Typography>
                    </Link>
                </Stack>
            </Grid>
            <Modal
                open={modalOpen}
                onClose={onModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Stack
                        direction="column"
                        spacing={2}
                    >
                        <Typography variant="h6" component="h2">
                            所有平台
                        </Typography>
                        {AllPlatforms.map(p => {
                            return (
                                <Stack
                                    key={p.name}
                                    direction='column'
                                >
                                    <Stack
                                        direction="row"
                                        alignItems='center'
                                        spacing={1}
                                    >
                                        {p.downloadUrl ?
                                            <Link href={p.downloadUrl}>
                                                <Typography>
                                                    {p.name}
                                                </Typography>
                                            </Link> :
                                            <Typography>
                                                {p.name}
                                            </Typography>
                                        }
                                        <Link href={p.sourceCodeUrl}>
                                            <CodeIcon fontSize="small"/>
                                        </Link>
                                    </Stack>
                                    {p.experimental &&
                                        <Typography variant="caption" display="block">实验版</Typography>
                                    }
                                    <Typography variant="caption" display="block">
                                        开发者 {p.authors.map(author => {
                                        return (
                                            <span key={author.url}>
                                                <Link href={author.url}>{author.name}</Link>
                                                <span>{' '}</span>
                                            </span>
                                        )
                                    })}
                                    </Typography>
                                    {p.alternativeApp &&
                                        <Stack
                                            direction="row"
                                            alignItems='center'
                                            spacing={1}
                                        >
                                            {
                                                p.alternativeApp.downloadUrl ?
                                                <Link href={p.alternativeApp.downloadUrl}>
                                                    <Typography variant="caption">
                                                        {p.alternativeApp.name} 版
                                                    </Typography>
                                                </Link> :
                                                <Typography variant="caption">
                                                    {p.alternativeApp.name} 版
                                                </Typography>
                                            }
                                            <Link
                                                href={p.alternativeApp.sourceCodeUrl}
                                            >
                                                <CodeIcon fontSize="small"/>
                                            </Link>
                                            <Typography variant="caption">
                                                开发者 {p.alternativeApp.authors.map(author => {
                                                    return (
                                                        <span key={author.url}>
                                                            <Link href={author.url}>{author.name}</Link>
                                                            <span>{' '}</span>
                                                        </span>
                                                    )
                                                })}
                                            </Typography>
                                        </Stack>
                                    }
                                </Stack>
                            )
                        })}
                    </Stack>
                </Box>
            </Modal>
        </Grid>
    )
}
