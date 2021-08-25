/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
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

type State = {
    name: string
    email: string
    description: string
}

export default class FormDialog extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            description: '',
        }

        this.inputName = this.inputName.bind(this)
        this.inputEmail = this.inputEmail.bind(this)
        this.inputDescription = this.inputDescription.bind(this)
    }

    inputName = (event: React.ChangeEvent) => {
        // event.targetにHTMLInputElement様子があることを確認しなければならない
        if (!(event.target instanceof HTMLInputElement)) {
            return
        }
        this.setState({ name: event.target.value })
    }

    inputEmail = (event: React.ChangeEvent) => {
        // event.targetにHTMLInputElement様子があることを確認しなければならない
        if (!(event.target instanceof HTMLInputElement)) {
            return
        }
        this.setState({ email: event.target.value })
    }

    inputDescription = (event: React.ChangeEvent) => {
        // event.targetにHTMLInputElement様子があることを確認しなければならない
        if (!(event.target instanceof HTMLInputElement)) {
            return
        }
        this.setState({ description: event.target.value })
    }

    submitForm = () => {
        const { name, email, description } = this.state

        // 本当は空欄などのバリデーションを入れるべきだが、動画では割愛

        const payload = {
            text:
                `問い合わせ有ったよ！\n` +
                `お名前'${name}\n` +
                `Email${email}\n` +
                `お問い合わせ内容\n${description}`,
        }

        // SlackAPIのIncomingWebhookで取得したURL
        const url =
            'https://hooks.slack.com/services/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'

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload),
        }).then(() => {
            alert('後で連絡するから楽しみに待っててね')

            // 初期化しておく
            this.setState({
                name: '',
                email: '',
                description: '',
            })

            // モーダルを閉じておく
            return this.props.handleClose()
        })
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
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
                        value={this.state.name}
                        type="text"
                        onChange={this.inputName}
                    />
                    <TextInput
                        label="メルアド(必須)"
                        multiline={false}
                        rows={1}
                        value={this.state.email}
                        type="text"
                        onChange={this.inputEmail}
                    />
                    <TextInput
                        label="問い合わせ内容(必須)"
                        multiline
                        rows={5}
                        value={this.state.description}
                        type="text"
                        onChange={this.inputDescription}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        キャンセル
                    </Button>
                    <Button onClick={this.submitForm} color="primary" autoFocus>
                        送信する
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}
