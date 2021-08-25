import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import NoProfile from '../assets/img/775c7c6a-a699-4156-a8bf-cc16b90ed66c_LI.jpg'
import Me from '../assets/img/775c7c6a-a699-4156-a8bf-cc16b90ed66c_LI (2).jpg'

type Props = {
    text: string
    type: string
}

const Chat: React.FC<Props> = ({ text, type }) => {
    const isQuestion = type === 'question'
    const classes = isQuestion ? 'p-chat__row' : 'p-chat__reverse'

    return (
        <ListItem className={classes}>
            <ListItemAvatar>
                {isQuestion ? (
                    <Avatar alt="Icon" src={Me} />
                ) : (
                    <Avatar alt="Icon" src={NoProfile} />
                )}
            </ListItemAvatar>
            <div className="p-chat__bubble">{text}</div>
        </ListItem>
    )
}

export default Chat
