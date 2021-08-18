import React, { useState } from 'react'

const TextInput = () => {
    const [name, setName] = useState('')

    // eventの型はReact.ChangeEvent
    const handleName = (event: React.ChangeEvent) => {
        // event.targetにHTMLInputElement様子があることを確認しなければならない
        if (!(event.target instanceof HTMLInputElement)) {
            return
        }
        console.log(event.target.value)
        setName(event.target.value)
    }

    return (
        <input
            onChange={(event) => handleName(event)}
            type="text"
            value={name}
        />
    )
}

export default TextInput
