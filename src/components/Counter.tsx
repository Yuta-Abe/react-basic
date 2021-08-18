import React, { useEffect, useState } from 'react'

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

    // useEffectでライフサイクル処理！
    // コンポーネントが再レンダリングされるたびに呼び出される
    // 最初のレンダリングでも呼び出される
    useEffect(() => {
        console.log('再レンダリングされましたよ～', count)
    })

    // deps(依存関係)が初回のみ
    useEffect(() => {
        console.log('最初のレンダリングですよ～', count)
    }, [])

    // deps(依存関係)がcountが変更されるたび
    useEffect(() => {
        console.log('カウント1が変更されましたよ～', count)
    }, [count])

    return (
        <div>
            <p>カウントの値: {count}</p>
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
