import React from 'react'
import { Answer } from './index'

type Props = {
    answers: {
        content: string
        nextId: string
    }[]
    select: (selectedAnswer: string, nextQuestionId: string) => void
}

const AnswersList: React.FC<Props> = ({ answers, select }) => {
    return (
        <div className="c-grid__answer">
            {/* mapで繰り返し */}
            {answers.map((value, index) => {
                // 繰り返しの場合はそれぞれの要素にkeyプロパティが必要になることに注意
                return (
                    <Answer
                        content={value.content}
                        nextID={value.nextId}
                        key={index.toString()}
                        select={select}
                    />
                )
            })}
        </div>
    )
}

export default AnswersList
