import React, { FC, ChangeEvent, useCallback, useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextInput from './TextInput'

type Props = {
    open: boolean
    handleClose: () => void
}

const FormDialog: FC<Props> = ({ open, handleClose }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [description, setDescription] = useState('')

    const inputName = useCallback(
        // event.targetにHTMLInputElement様子があることを確認しなければならない
        (event: ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value)
        },
        [setName]
    )

    const inputEmail = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value)
        },
        [setEmail]
    )

    const inputDescription = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setDescription(event.target.value)
        },
        [setDescription]
    )

    const submitForm = () => {
        // 本当は空欄などのバリデーションを入れるべきだが、動画では割愛
        const payload = {
            text:
                `問い合わせ有ったよ！\n` +
                `お名前：${name}\n` +
                `Email：${email}\n` +
                `お問い合わせ内容\n${description}`,
        }

        // SlackAPIのIncomingWebhookで取得したURL
        // 注意、普通、フロント側に公開してはいけないURLやトークンを書いてはいけません
        // 今回は個人利用のSlackに送っているため、ここに記述しますが、Githubに上げるたびにURLが変更されてしまいます
        // 普通、バックエンド側（API側）に仕込ませておいて他人に読み取られないようにしておくことが重要です。
        const url = 'URLをいれる'

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload),
        }).then(() => {
            alert('後で連絡するから楽しみに待っててね')

            // 初期化しておく
            setName('')
            setEmail('')
            setDescription('')

            // モーダルを閉じておく
            return handleClose()
        })
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                ここがダイアログのタイトル
            </DialogTitle>
            <DialogContent>
                <TextInput
                    label="お名前(必須)"
                    multiline={false}
                    rows={1}
                    value={name}
                    type="text"
                    onChange={inputName}
                />
                <TextInput
                    label="メルアド(必須)"
                    multiline={false}
                    rows={1}
                    value={email}
                    type="text"
                    onChange={inputEmail}
                />
                <TextInput
                    label="問い合わせ内容(必須)"
                    multiline
                    rows={5}
                    value={description}
                    type="text"
                    onChange={inputDescription}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    キャンセル
                </Button>
                <Button onClick={submitForm} color="primary" autoFocus>
                    送信する
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default FormDialog
