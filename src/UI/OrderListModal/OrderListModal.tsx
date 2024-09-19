import React, { useEffect, useState, useRef } from 'react'

import { Modal, Button, DraggableList } from '../..'


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
                title="Changer l'ordre"
                variant="info" 
                closeBtn={false} 
                closeOnOverlayClick={false}
                footer={
                    <>
                        <Button variant='danger' onClick={() => {
                            props.onCancel && props.onCancel()
                            closeModal()
                        }}>Annuler</Button>
                        <Button variant='success' onClick={() => {
                            props.onConfirm(list)
                            closeModal()
                        }}>Confirmer</Button>
                    </>
                }
            >
                {/* draggable list */}
                <div className="kit-modal-order-list-items">
                    <DraggableList list={list} onReorder={setList} />
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
