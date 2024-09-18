import React, { useEffect, useState, useRef } from 'react'

import { Modal, Button } from '../..'

import './OrderListModal.css'

type OrderListModalProps = {
    // list of objects
    list: string[]
    // callback function to be called when the user confirms the order
    onConfirm: (list: string[]) => void
    // callback function to be called when the user cancels the order
    onCancel?: () => void
}

const OrderListModalContainer = () => {
    const [showModal, setShowModal] = useState(false)
    const [draggedItem, setDraggedItem] = useState<number | null>(null)
    const [draggedOverItem, setDraggedOverItem] = useState<number | null>(null)

    const [props, setProps] = useState<OrderListModalProps>({
        list: [],
        onConfirm: () => {},
        onCancel: () => {}
    })

    const [list, setList] = useState<any[]>([])

    useEffect(() => {
        setList(props.list)
    }, [props.list])

    const openModal = (props: OrderListModalProps) => {
        setProps(props)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    useEffect(() => {
        const handleOpenModal = (event: Event) => {
            const customEvent = event as CustomEvent<OrderListModalProps>;
            openModal(customEvent.detail);
        };

        const container = document.getElementById('kit-modal-order-list-container');
        container?.addEventListener('openOrderListModal', handleOpenModal);

        // Clean up the event listener when the component unmounts
        return () => {
            container?.removeEventListener('openOrderListModal', handleOpenModal);
        };
    }, [])

    return (
        <div id="kit-modal-order-list-container">
            <Modal 
                open={showModal} 
                onClose={closeModal}
                title="Order List"
                variant="info" 
                closeBtn={false} 
                closeOnOverlayClick={false}
            >
                {/* draggable list */}
                <div className="kit-modal-order-list-items">
                    {list.map((item, index) => (
                        <div 
                        key={index} 
                        className="kit-modal-order-list-item" 
                        draggable={true}
                        onDragStart={() => setDraggedItem(index)}
                        onDragOver={() => setDraggedOverItem(index)}
                        onDragEnd={() => {
                            if (draggedItem !== null && draggedOverItem !== null) {
                                const _temp = [...list]
                                const draggedIndex = _temp.splice(draggedItem, 1)[0]
                                _temp.splice(draggedOverItem, 0, draggedIndex)
                                setList(_temp)
                            }
                            setDraggedItem(null)
                            setDraggedOverItem(null)
                        }}
                        >
                            {item}
                        </div>
                    ))}
                </div>

                <div className="kit-modal-footer">
                    <Button variant="danger" onClick={() => { props.onCancel?.(); closeModal() }}>Annuler</Button>
                    <Button variant="success" onClick={() => { props.onConfirm(list); closeModal() }}>Confirmer</Button>
                </div>
            </Modal>
        </div>
    )
}

function openOrderListModal(list: any[], onConfirm: (list: any[]) => void, onCancel?: () => void) {
    const container = document.getElementById('kit-modal-order-list-container');
    container?.dispatchEvent(new CustomEvent('openOrderListModal', { detail: { list, onConfirm, onCancel } }))
}

export { OrderListModalContainer, openOrderListModal }
