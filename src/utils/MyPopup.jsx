import React from 'react'
import { Popup } from 'semantic-ui-react'

export const MyPopup = ({ content, children }) => {
    return <Popup inverted content={content} trigger={children} />
}

