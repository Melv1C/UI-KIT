
import React from 'react';

import { Bounce, ToastContainer, ToastOptions, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const MyToastContainer = () => {
  return (
    <ToastContainer />
  )
}

interface MyToastProps {
    message: string,
    type?: 'info' | 'success' | 'warning' | 'error' | undefined,
    position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left',
    time?: number

}

export const MyToast = ({ message, type = undefined, position = 'top-right', time = 3000 }: MyToastProps) => {

    let toastOpt: ToastOptions = {
        position,
        autoClose: time,
        hideProgressBar: false,
        theme: 'light',
        transition: Bounce,
        progress: undefined,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
    }

    switch (type) {
        case 'info':
            toast.info(message, toastOpt)
            break
        case 'success':
            toast.success(message, toastOpt)
            break
        case 'warning':
            toast.warning(message, toastOpt)
            break
        case 'error':
            toast.error(message, toastOpt)
            break
        default:
            toast(message, toastOpt)
    }
}