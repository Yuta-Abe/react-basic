import React from 'react'

// 暗黙Anyは使えないのでPropsを型エイリアスを使用して定義しておく
type Props = {
    content: string
}

const Content: React.FC<Props> = ({ content }) => {
    return <p>{content}</p>
}

export default Content
