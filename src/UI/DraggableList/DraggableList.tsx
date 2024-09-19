import React, { useEffect, useRef } from 'react'


import './DraggableList.css'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

type DraggableListProps = {
    list: string[]
    onReorder: (list: string[]) => void
}

export const DraggableList = ({ list, onReorder }: DraggableListProps) => {

    const onDragEnd = (result: any) => {
        console.log(result)
        if (!result.destination) {
            return
        }

        const reorderedList = Array.from(list)
        const [removed] = reorderedList.splice(result.source.index, 1)
        reorderedList.splice(result.destination.index, 0, removed)

        onReorder(reorderedList)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className={`kit-draggable-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}>
                        {list.map((item, index) => (
                            <Draggable key={index} draggableId={index.toString()} index={index}>
                                {(provided: any, snapshot: any) => (
                                    <div ref={provided.innerRef} className={`kit-draggable-list-item ${snapshot.isDragging ? 'dragging' : ''}`} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        {item}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}
