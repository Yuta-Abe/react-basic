import React from 'react'
// MUIを使用
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(() =>
    createStyles({
        button: {
            borderColor: '#FFB549',
            color: '#FFB459',
            fontWeight: 600,
            marginButtom: '8px',
            '&:hover': {
                backgroundColor: '#FFB549',
                color: '#FFF',
            },
        },
    })
)

type Props = {
    content: string
    nextID: string
    select: (selectedAnswer: string, nextQuestionId: string) => void
}

const Answer: React.FC<Props> = ({ content, nextID, select }) => {
    const classes = useStyles()
    return (
        <Button
            className={classes.button}
            variant="outlined"
            onClick={() => select(content, nextID)}
        >
            {content}
        </Button>
    )
}

export default Answer
