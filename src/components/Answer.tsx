import React from 'react'
// MUIを使用
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

type Props = {
    content: string
    // nextIDは持たない方がよい
    nextId: string
    disabled: boolean
    // 不要にできる。onClickを引数にとるように実装する
    select: (selectedAnswer: string, nextQuestionId: string) => void
}

// 使い方が微妙
// 何かライブラリ等を使う場合は公式をチェックすること！！
// https://material-ui.com/ja/customization/palette/
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

// Propsにはデフォルト値を設定すること！！
const Answer = ({
    content = '',
    nextId = '',
    select = () => {},
    disabled = false,
}: Props) => {
    const classes = useStyles()
    return (
        <Button
            type="button"
            variant="outlined"
            className={classes.button}
            color="primary"
            disabled={disabled}
            onClick={() => select(content, nextId)}
        >
            {content}
        </Button>
    )
}

export default Answer
