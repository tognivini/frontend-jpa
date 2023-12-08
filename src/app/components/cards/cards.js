import React from 'react'

import { Card, Row } from './styles'

const Cards = ({children, ...props}) => {
    
    return (
        <Card {...props}>
            <p>{props.text}</p>
            <div>
                {children}
            </div>
        </Card>
    )
}

export { Cards }