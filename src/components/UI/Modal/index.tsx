import React, { FC } from 'react'

import './modal.scss'

export type BackdropProps = {
  onClose: () => void
}

const Backdrop = ({ onClose }: BackdropProps) => {
  return (
    <div
      className="backdrop"
      aria-hidden="true"
      onClick={onClose}
      onKeyDown={onClose}
    />
  )
}

const ModalOverlay: FC = ({ children }) => {
  return (
    <div className="modal">
      <div className="content">{children}</div>
    </div>
  )
}

const Modal: FC<BackdropProps> = ({ onClose, children }) => {
  return (
    <>
      <Backdrop onClose={onClose} />
      <ModalOverlay>{children}</ModalOverlay>
    </>
  )
}

export default Modal
