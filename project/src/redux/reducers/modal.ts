import { ModalState, TOGGLE_MODAL, ModalAction } from '../../types'

export default function modal(
  state: ModalState = {
    showModal: false,
  },
  action: ModalAction
): ModalState {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        showModal: !state.showModal,
      }
    default:
      return state
  }
}
