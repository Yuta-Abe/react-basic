import React from 'react'
import { Content, Title } from './index'

// 暗黙Anyは使えないのでPropsを型エイリアスを使用して定義しておく
type Props = {
    title: string
    content: string
}

// 関数コンポーネント(React.FC {FunctionComponent} )を使用して、
// Articleに型をアノテーションする。
// このようにすることで、破壊的オブジェクトの警告を回避する

const Article: React.FC<Props> = ({ title, content }) => {
    return (
        <div>
            <Title title={title} />
            <Content content={content} />
        </div>
    )
}

export default Article
