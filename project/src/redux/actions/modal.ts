import { TOGGLE_MODAL, ModalAction } from '../../types'

export function toggleModal(): ModalAction {
  return {
    type: TOGGLE_MODAL,
  }
}
