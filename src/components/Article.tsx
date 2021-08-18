import React, { useState } from 'react'
import { Content, Title, BeTypeSafeButton } from './index'

// 暗黙Anyは使えないのでPropsを型エイリアスを使用して定義しておく
type Props = {
    title: string
    content: string
}

// 関数コンポーネント(React.FC {FunctionComponent} )を使用して、
// Articleに型をアノテーションする。
// このようにすることで、破壊的オブジェクトの警告を回避する

const Article: React.FC<Props> = ({ title, content }) => {
    // useStateメソッドで現在の状態と、状態を更新させるためのメソッドを取得
    const [isTypeSafe, setIsTypeSafe] = useState(false)

    // BeTypeSafeButtonに渡すメソッドを定義
    const beTypeSafe = () => {
        setIsTypeSafe(true)
    }
    return (
        <div>
            <Title title={title} />
            <Content content={content} />
            <BeTypeSafeButton isTypeSafe={isTypeSafe} OnClick={beTypeSafe} />
        </div>
    )
}

export default Article
