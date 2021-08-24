/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PinDropSharp } from '@material-ui/icons'
import React from 'react'
import { Answer } from './index'

type Props = {
    answers: {
        content: string
        nextId: string
    }[]
}

const AnswersList: React.FC<Props> = ({ answers }) => {
    return (
        <div className="c-grid__answer">
            {/* mapで繰り返し */}
            {answers.map((value, index) => {
                // 繰り返しの場合はそれぞれの要素にkeyプロパティが必要になることに注意
                return <Answer content={value.content} key={index.toString()} />
            })}
        </div>
    )
}

export default AnswersList
