import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosCloseCircleOutline } from 'react-icons/io'

import FavoriteRow from '../FavoriteRow'
import Modal from '../../UI/Modal'
import { ThemeContext } from '../../../context/theme-context'
import { toggleModal } from '../../../redux/actions'
import { AppState } from '../../../types'
import './favoriteModal.scss'

const FavoriteModal = () => {
  const dispatch = useDispatch()

  const { theme } = useContext(ThemeContext)

  const { favoriteCountries } = useSelector((state: AppState) => state.country)

  const closeHandler = () => {
    dispatch(toggleModal())
  }

  return (
    <Modal onClose={closeHandler}>
      <div className={`modal__header modal__header-${theme}`}>
        <h2>Favorite List</h2>
        <IoIosCloseCircleOutline
          className="icon modal__close"
          onClick={closeHandler}
        />
      </div>
      {favoriteCountries.map((country) => (
        <FavoriteRow key={country.commonName} country={country} />
      ))}
    </Modal>
  )
}

export default FavoriteModal
