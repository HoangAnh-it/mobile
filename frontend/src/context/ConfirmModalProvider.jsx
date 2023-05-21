import React from 'react'
import ConfirmModal from '../component/ConfirmModal';

const ConfirmContext = React.createContext()

export default ConfirmContext

export function ConfirmModalProvider({ children }) {
    const [title, setTitle] = React.useState("")
    const [visible, setVisible] = React.useState(false)
    const [action, _setAction] = React.useState(() => () => { });
    const [isAlert, setIsAlert] = React.useState(false)

    const reset = () => {
        setTitle("")
        setVisible(false)
        setAction(() => () => { })
        setIsAlert(false)
    }

    const setAction = (func) => {
        _setAction(() => func)
    }

    return (
        <ConfirmContext.Provider value={{
            setTitle,
            setVisible,
            setAction,
            setIsAlert
        }}>
            <ConfirmModal
                title={title}
                action={() => {
                    action()
                    reset()
                }}
                off={reset}
                modalVisible={visible}
                isAlert={isAlert}
            >
                {children}
            </ConfirmModal>
        </ConfirmContext.Provider>
    )
}