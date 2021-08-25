import React from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
// 名前付きエクスポートから呼び出す場合は名前付きインポート{}をつけないといけない
import { Chat } from './index'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: '36ch',
            backgroundColor: theme.palette.background.paper,
        },
        inline: {
            display: 'inline',
        },
    })
)

type Props = {
    chats: {
        text: string
        type: string
    }[]
}

const Chats: React.FC<Props> = ({ chats }) => {
    const classes = useStyles()
    return (
        <List className={classes.root}>
            {chats.map((chat, index) => {
                return (
                    <Chat
                        text={chat.text}
                        type={chat.type}
                        key={index.toString()}
                    />
                )
            })}
        </List>
    )
}

export default Chats
