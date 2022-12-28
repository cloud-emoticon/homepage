import {Box, Button, Grid, IconButton, Modal, Stack, Typography} from "@mui/material";
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import React, {useEffect, useState} from "react";
// @ts-ignore
import platform from 'platform-detect'

interface Author {
    name: string,
    url: string
}

interface AuxiliaryPlatform {
    name: string,
    downloadUrl?: string,
    sourceCodeUrl: string,
    authors: Author[],
}

interface Platform extends AuxiliaryPlatform {
    _platformDetectName: string
    auxiliaryPlatform?: AuxiliaryPlatform,
}

const Platforms: Platform[] = [
    {
        _platformDetectName: 'android',
        name: 'Android',
        downloadUrl: 'https://play.google.com/store/apps/details?id=org.ktachibana.cloudemoji',
        sourceCodeUrl: 'https://github.com/cloud-emoticon/cloudemoticon-android',
        authors: [{
            name: 'KTachibanaM',
            url: 'https://twitter.com/KTachibana_M'
        }],
        auxiliaryPlatform: {
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
        sourceCodeUrl: 'https://github.com/kinosang/cloudEmoji_win',
        authors: [
            {
                name: 'Simon Chan',
                url: 'https://github.com/kinosang',
            }
        ]
    }
]

const _platformByPlatformDetectName: { [key: string]: Platform | undefined } = Object.fromEntries(Platforms.map(p => {
    return [p._platformDetectName, Platforms.find(_p => _p._platformDetectName === p._platformDetectName)]
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
    const [detectingPlatform, setDetectingPlatform] = useState(true);
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
        }
        setDetectingPlatform(false)
    }, [])

    return (
        <>
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
                        spacing={1}
                    >
                        <Typography variant="h4" component="div">
                            在云中找到你所爱的颜文字
                        </Typography>
                        <Typography variant="h6" display="div">
                            这款App能够从远程服务器上下载颜文字源，将它们在分类的列表中展示出来，并让你一键复制。
                        </Typography>
                        <Typography variant="h6" display="div">
                            你只需从这些地方下载你的颜文字列表（JSON或者XML格式），例如你自己的服务器，或者从 <Link
                            href='/store'
                            underline='always'>源商店</Link> 里添加别人的源。
                        </Typography>
                        <Typography variant="h6" display="div">
                            这样你就不需要手动折腾输入法，使用不能一键复制的其它云App，或者使用不能自定义的颜文字App。
                        </Typography>
                        {!detectingPlatform
                            && (detectedPlatform ?
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
                                                {`${detectedPlatform.downloadUrl ? '下载' : '尚未正式发布，自行编译'} ${detectedPlatform.name} 版本`}
                                            </Button>
                                        </Link>
                                        {detectedPlatform && detectedPlatform.downloadUrl &&
                                          <Link href={detectedPlatform.sourceCodeUrl}>
                                            <IconButton
                                              size='large'
                                            >
                                              <GitHubIcon/>
                                            </IconButton>
                                          </Link>
                                        }
                                    </Stack> :
                                    <Stack
                                        direction="row"
                                        alignItems='center'
                                    >
                                        <Button
                                            variant="contained"
                                            size='large'
                                            disabled={true}
                                        >
                                            该平台的版本尚未开发，敬请期待
                                        </Button>
                                    </Stack>
                            )
                        }
                        {
                            detectedPlatform && detectedPlatform.authors &&
                          <Typography variant="caption" display="block">
                            开发者 {detectedPlatform?.authors.map(author => {
                              return (
                                  <>
                                      <Link key={author.url} href={author.url}>{author.name}</Link>
                                      <span>{' '}</span>
                                  </>
                              )
                          })}
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
                                其他平台
                            </Typography>
                        </Link>
                        {
                            detectedPlatform && detectedPlatform.auxiliaryPlatform &&
                          <Typography variant="caption" display="block">
                            正在使用 {detectedPlatform.auxiliaryPlatform.name} ？你也可以{detectedPlatform.auxiliaryPlatform.downloadUrl ? '试试' : '自行编译'} {detectedPlatform.auxiliaryPlatform.authors.map(author => {
                              return (
                                  <>
                                      <Link key={author.url} href={author.url}>{author.name}</Link>
                                      <span>{' '}</span>
                                  </>
                              )
                          })} 的 <Link
                            href={detectedPlatform.auxiliaryPlatform.downloadUrl ? detectedPlatform.auxiliaryPlatform.downloadUrl : detectedPlatform.auxiliaryPlatform.sourceCodeUrl}>{detectedPlatform.auxiliaryPlatform.name} 版本</Link>
                              {
                                  detectedPlatform.auxiliaryPlatform.downloadUrl &&
                                <>
                                    {' '}
                                  <Link href={detectedPlatform.auxiliaryPlatform.sourceCodeUrl}>（源代码）</Link>
                                </>
                              }
                          </Typography>
                        }
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
                            {Platforms.map(p => {
                                return (
                                    <Stack key={p.name}>
                                        <Typography>
                                            {p.name}
                                        </Typography>
                                        <Typography>
                                            {p.downloadUrl && <>{' '}<Link href={p.downloadUrl}>下载</Link></>}{<>{' '}<Link
                                            href={p.sourceCodeUrl}>源代码</Link></>}
                                        </Typography>
                                        <Typography variant="caption" display="block">
                                            开发者 {p.authors.map(author => {
                                            return (
                                                <>
                                                    <Link key={author.url} href={author.url}>{author.name}</Link>
                                                    <span>{' '}</span>
                                                </>
                                            )
                                        })}
                                        </Typography>
                                        {p.auxiliaryPlatform &&
                                          <Typography variant="caption" display="block">
                                              {p.auxiliaryPlatform.name} 版本 {p.auxiliaryPlatform.downloadUrl && <>{' '}<Link
                                            href={p.auxiliaryPlatform.downloadUrl}>下载</Link></>}{<>{' '}<Link
                                              href={p.auxiliaryPlatform.sourceCodeUrl}>源代码</Link></>} 开发者 {p.auxiliaryPlatform.authors.map(author => {
                                              return (
                                                  <>
                                                      <Link key={author.url} href={author.url}>{author.name}</Link>
                                                      <span>{' '}</span>
                                                  </>
                                              )
                                          })}
                                          </Typography>
                                        }
                                    </Stack>
                                )
                            })}
                        </Stack>
                    </Box>
                </Modal>
            </Grid>
            <Link href="https://ktachibana.party/cloudemoticon/privacy">
                <Typography variant="caption" display="block" align="center" gutterBottom>
                    隐私政策
                </Typography>
            </Link>
        </>
    )
}
