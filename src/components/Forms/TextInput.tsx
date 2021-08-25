import React from 'react'
// import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

type Props = {
    label: string
    multiline: boolean
    rows: number
    value: string
    type: string
    onChange: (event: React.ChangeEvent) => void
}

const TextInput: React.FC<Props> = ({
    label,
    multiline,
    rows,
    value,
    type,
    onChange,
}) => {
    return (
        <TextField
            fullWidth
            id="standard-basic"
            label={label}
            margin="dense"
            multiline={multiline}
            rows={rows}
            value={value}
            type={type}
            onChange={onChange}
        />
    )
}

export default TextInput
