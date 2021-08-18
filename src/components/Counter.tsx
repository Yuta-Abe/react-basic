import React, { useState } from 'react'

const Counter = () => {
    // useStateで状態取得
    const [count, setCount] = useState(0)

    // カウントアップメソッド
    // ここでsetCount(count+1)はしてはいけない
    // 軽い処理なら問題ないが、何らかの原因で重くなった場合、
    // カウントされなくなりバグが発生する
    // prevStateならひとつ前の状態を参照するので
    // どんなに重くても押した分だけきちんと処理される
    const countUp = () => {
        setCount((prevState) => prevState + 1)
    }

    // カウントダウンメソッド
    const countDown = () => {
        setCount((prevState) => prevState - 1)
    }

    return (
        <div>
            <p>現在のカウント値: {count}</p>
            <button onClick={countUp} type="button">
                up
            </button>
            <button onClick={countDown} type="button">
                down
            </button>
        </div>
    )
}

export default Counter
