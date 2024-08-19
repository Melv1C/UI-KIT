
import React from 'react'

import Button from './UI/Button'
export { Button }

import Input from './UI/Input'
export { Input }

import Table from './UI/Table'
export { Table }

import { newColumn } from './UI/Table'
export { newColumn }

import { MySwitch as Switch } from './UI/Switches/Switches'
export { Switch }

import { MyToastContainer, MyToast as toast } from './UI/Toast/Toast'
export { toast }

import { Modal, ModalContainer, showModal, ConfirmModalContainer, confirm, YesNoModalContainer, yesno } from './UI/Modal/Modal'
export { Modal, showModal, confirm, yesno }

import './Kit.css'

export const KitContainer = () => {
  return (
    <div className="kit-container">
      <MyToastContainer />
      <ModalContainer />
      <ConfirmModalContainer />
      <YesNoModalContainer />
    </div>
  )
}


