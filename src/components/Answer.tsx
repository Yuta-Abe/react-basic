import React from 'react'
// MUIを使用
// import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

// MUIからコピペ
// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         root: {},
//     })
// )

type Props = {
    content: string
    nextID: string
    select: (selectedAnswer: string, nextQuestionId: string) => void
}

const Answer: React.FC<Props> = ({ content, nextID, select }) => {
    // const classes = useStyles()
    return (
        <Button
            variant="contained"
            color="primary"
            onClick={() => select(content, nextID)}
        >
            {content}
        </Button>
    )
}

export default Answer
