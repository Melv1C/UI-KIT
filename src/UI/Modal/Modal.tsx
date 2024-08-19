import React, { useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import './Modal.css'

interface ModalProps {
    open: boolean,
    onClose: () => void,
    title: string,
    children: React.ReactNode,
    variant?: 'info' | 'success' | 'warning' | 'danger',
    closeBtn?: boolean,
    closeOnOverlayClick?: boolean,
}

export const Modal: React.FC<ModalProps> = ({ 
    open, 
    onClose, 
    title,
    children,
    variant = 'info',
    closeBtn = true,
    closeOnOverlayClick = true
}) => {
    return (
        <div className={`kit-modal ${open ? 'kit-modal-open' : ''}`}>
            <div className="kit-modal-overlay" onClick={closeOnOverlayClick ? onClose : undefined}></div>
            <div className={`kit-modal-content kit-modal-${variant}`}>
                <div className="kit-modal-header">
                    <div className="kit-modal-title">{title}</div>
                    {closeBtn && <button className="kit-modal-close" onClick={onClose}><FontAwesomeIcon icon={faTimes} /></button>}
                </div>
                <div className="kit-modal-body">
                    {children}
                </div>
            </div>
        </div>        
    )
}

interface ConfirmModalProps extends ModalProps {
    onConfirm: () => void
    onCancel?: () => void
}


export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    open,
    onClose,
    title,
    children,
    variant = 'info',
    closeBtn = true,
    closeOnOverlayClick = true,
    onConfirm,
    onCancel = onClose
}) => {
    return (
        <Modal open={open} onClose={onClose} title={title} variant={variant} closeBtn={closeBtn} closeOnOverlayClick={closeOnOverlayClick}>
            {children}
            <div className="kit-modal-footer">
                <button className="kit-btn kit-btn-danger" onClick={onCancel}>Annuler</button>
                <button className="kit-btn kit-btn-success" onClick={onConfirm}>Confirmer</button>
            </div>
        </Modal>
    )
}

interface YesNoModalProps extends ModalProps {
    onYes: () => void
    onNo?: () => void
}

export const YesNoModal: React.FC<YesNoModalProps> = ({
    open,
    onClose,
    title,
    children,
    variant = 'info',
    closeBtn = true,
    closeOnOverlayClick = true,
    onYes,
    onNo = onClose
}) => {
    return (
        <Modal open={open} onClose={onClose} title={title} variant={variant} closeBtn={closeBtn} closeOnOverlayClick={closeOnOverlayClick}>
            {children}
            <div className="kit-modal-footer">
                <button className="kit-btn kit-btn-danger" onClick={onNo}>Non</button>
                <button className="kit-btn kit-btn-success" onClick={onYes}>Oui</button>
            </div>
        </Modal>
    )
}

interface ModalContainerProps {
    title: string
    content: React.ReactNode
    variant?: 'info' | 'success' | 'warning' | 'danger'
    onClose: () => void
}

const ModalContainer: React.FC = () => {
    const [showModal, setShowModal] = React.useState(false)

    const [props, setProps] = React.useState<ModalContainerProps>({
        title: '',
        content: '',
        variant: 'info',
        onClose: () => {}
    })

    const openModal = (props: ModalContainerProps) => {
        setProps(props)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    useEffect(() => {
        const handleOpenModal = (event: Event) => {
            const customEvent = event as CustomEvent<ModalContainerProps>;
            openModal(customEvent.detail);
        };

        const container = document.getElementById('kit-modal-container');
        container?.addEventListener('showModal', handleOpenModal);

        // Clean up the event listener when the component unmounts
        return () => {
            container?.removeEventListener('showModal', handleOpenModal);
        };
    }, [])

    return (
        <div id="kit-modal-container">
            <Modal 
                open={showModal} 
                onClose={closeModal} 
                title={props.title} 
                variant={props.variant} 
                closeBtn={true} 
                closeOnOverlayClick={true}
            >
                {props.content}
            </Modal>
        </div>
    )
}

function showModal(title: string, content: React.ReactNode, onClose: () => void = () => {}, variant: 'info' | 'success' | 'warning' | 'danger' = 'info') {
    const container = document.getElementById('kit-modal-container');
    container?.dispatchEvent(new CustomEvent('showModal', { detail: { title, content, variant, onClose } }))
}

export { ModalContainer, showModal }


interface ConfirmModalContainerProps {
    question: string
    onConfirm: () => void
    onCancel: () => void
}


const ConfirmModalContainer: React.FC = () => {
    const [showModal, setShowModal] = React.useState(false)

    const [props, setProps] = React.useState<ConfirmModalContainerProps>({
        question: '',
        onConfirm: () => {},
        onCancel: () => {}
    })

    const openModal = (props: ConfirmModalContainerProps) => {
        setProps(props)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const handleConfirm = () => {
        props.onConfirm()
        closeModal()
    }

    const handleCancel = () => {
        props.onCancel()
        closeModal()
    }

    useEffect(() => {
        const handleOpenModal = (event: Event) => {
            const customEvent = event as CustomEvent<ConfirmModalContainerProps>;
            openModal(customEvent.detail);
        };

        const container = document.getElementById('kit-modal-confirm-container');
        container?.addEventListener('openConfirmModal', handleOpenModal);

        // Clean up the event listener when the component unmounts
        return () => {
            container?.removeEventListener('openConfirmModal', handleOpenModal);
        };
    }, [])

    return (
        <div id="kit-modal-confirm-container">
            <ConfirmModal 
                open={showModal} 
                onClose={closeModal} 
                title="Confirmation"
                variant='danger' 
                closeBtn={false} 
                closeOnOverlayClick={false} 
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            >
                <p>{props.question}</p>
            </ConfirmModal>
        </div>
    )
}

function confirm(question: string, onConfirm: () => void, onCancel: () => void = () => {}) {
    const container = document.getElementById('kit-modal-confirm-container');
    container?.dispatchEvent(new CustomEvent('openConfirmModal', { detail: { question, onConfirm, onCancel } }))
    
}

export { ConfirmModalContainer, confirm }

interface YesNoModalContainerProps {
    question: string
    onYes: () => void
    onNo: () => void
}

const YesNoModalContainer: React.FC = () => {
    const [showModal, setShowModal] = React.useState(false)

    const [props, setProps] = React.useState<YesNoModalContainerProps>({
        question: '',
        onYes: () => {},
        onNo: () => {}
    })

    const openModal = (props: YesNoModalContainerProps) => {
        setProps(props)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const handleYes = () => {
        props.onYes()
        closeModal()
    }

    const handleNo = () => {
        props.onNo()
        closeModal()
    }

    useEffect(() => {
        const handleOpenModal = (event: Event) => {
            const customEvent = event as CustomEvent<YesNoModalContainerProps>;
            openModal(customEvent.detail);
        };

        const container = document.getElementById('kit-modal-yesno-container');
        container?.addEventListener('openYesNoModal', handleOpenModal);

        // Clean up the event listener when the component unmounts
        return () => {
            container?.removeEventListener('openYesNoModal', handleOpenModal);
        };
    }, [])

    return (
        <div id="kit-modal-yesno-container">
            <YesNoModal 
                open={showModal} 
                onClose={closeModal} 
                title="Confirmation"
                variant='danger' 
                closeBtn={false} 
                closeOnOverlayClick={false} 
                onYes={handleYes}
                onNo={handleNo}
            >
                <p>{props.question}</p>
            </YesNoModal>
        </div>
    )
}

function yesno(question: string, onYes: () => void, onNo: () => void = () => {}) {
    const container = document.getElementById('kit-modal-yesno-container');
    container?.dispatchEvent(new CustomEvent('openYesNoModal', { detail: { question, onYes, onNo } }))
}

export { YesNoModalContainer, yesno }

