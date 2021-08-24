/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
// MUIを使用
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

// MUIからコピペ
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
    })
)

type Props = {
    content: string
}

const Answer: React.FC<Props> = ({ content }) => {
    // const classes = useStyles()
    return (
        <Button variant="contained" color="primary">
            {content}
        </Button>
    )
}

export default Answer
