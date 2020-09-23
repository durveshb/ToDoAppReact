import React from 'react'

export default function BulkTools(props) {
    return (
        <div className="toolmenu">
            <button className="tool tool__complete" onClick={props.onComplete}>&#9745;</button>
            <button className="tool tool__incomplete" onClick={props.onIncomplete}>&#9744;</button>
            <button className="tool tool__delete" onClick={props.onDelete}>&#9746;</button>
        </div>
    )
}
