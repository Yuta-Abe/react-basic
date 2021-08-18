import React, { useEffect, useState } from 'react'

const ToggleButton = () => {
    const [open, setOpen] = useState(false)

    // トグルは前回の状態prevStateを反転させるだけ
    const toggle = () => {
        setOpen((prevState) => !prevState)
    }

    useEffect(() => {
        console.log('今のトグルの状態は...', open)
        if (open) {
            console.log('サブスク！...')
        }

        // クリーンアップ関数
        // 再レンダリングされる前に呼び出される！！
        // Unmountの時に実行されるという意味
        return () => {
            console.log('サブスク終了…')
        }
    })

    return (
        <button onClick={toggle} type="button">
            {open ? 'OPEN' : 'CLOSE'}
        </button>
    )
}

export default ToggleButton
