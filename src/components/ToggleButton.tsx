import React, { useState } from 'react'

const ToggleButton = () => {
    const [open, setOpen] = useState(false)

    // トグルは前回の状態prevStateを反転させるだけ
    const toggle = () => {
        setOpen((prevState) => !prevState)
    }

    return (
        <button onClick={toggle} type="button">
            {open ? 'OPEN' : 'CLOSE'}
        </button>
    )
}

export default ToggleButton
