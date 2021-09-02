import React from 'react'
import { Answer } from './index'

type Props = {
    answers: {
        content: string
        nextId: string
    }[]
    executable: boolean
    select: (param: { content: string; nextId: string }) => void
}

const AnswerList = ({ answers, select, executable = true }: Props) => {
    return (
        <div className="c-grid__answer">
            {/* mapで繰り返し */}
            {answers.map((value, index) => {
                // 繰り返しの場合はそれぞれの要素にkeyプロパティが必要になることに注意
                return (
                    <Answer
                        content={value.content}
                        nextId={value.nextId}
                        disabled={!executable}
                        key={index.toString()}
                        select={() => select(value)}
                    />
                )
            })}
        </div>
    )
}

export default AnswerList
