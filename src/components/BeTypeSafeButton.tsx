import React from 'react'

type Props = {
    isTypeSafe: boolean
    OnClick: () => void
}

const BeTypeSafeButton: React.FC<Props> = ({ isTypeSafe, OnClick }) => {
    return (
        <button onClick={() => OnClick()} type="button">
            型安全: {String(isTypeSafe)}
        </button>
    )
}

export default BeTypeSafeButton
