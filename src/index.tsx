
import React from 'react'

import { Container, RowContainer, ColumnContainer } from './UI/Container/Container'
export { Container, RowContainer, ColumnContainer }

import Button from './UI/Button'
export { Button }

import {Input, Select} from './UI/Input/Input'
export { Input, Select }

import { Table, newColumn } from './UI/Table/Table'
export { Table, newColumn }

import { MySwitch as Switch } from './UI/Switches/Switches'
export { Switch }

import { MyToastContainer, MyToast as toast } from './UI/Toast/Toast'
export { toast }

import { Modal, ConfirmModal, YesNoModal, ModalContainer, showModal, ConfirmModalContainer, confirm, YesNoModalContainer, yesno } from './UI/Modal/Modal'
export { Modal, ConfirmModal, YesNoModal, showModal, confirm, yesno }

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


