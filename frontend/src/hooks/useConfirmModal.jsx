import ConfirmContext from "../context/ConfirmModalProvider";
import React from 'react'

export default function useConfirmModal() {
    return React.useContext(ConfirmContext)
}