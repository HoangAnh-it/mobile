import React from 'react'
import ConfirmModal from '../component/ConfirmModal';

const ConfirmContext = React.createContext()

export default ConfirmContext

export function ConfirmModalProvider({ children }) {
    const [title, setTitle] = React.useState("")
    const [visible, setVisible] = React.useState(false)
    const [action, setAction] = React.useState(() => () => { });

    const reset = () => {
        setTitle("")
        setVisible(false)
        setAction(() => () => { })
    }

    return (
        <ConfirmContext.Provider value={{ setTitle, visible, setVisible, setAction, doAction: action }}>
            <ConfirmModal
                title={title}
                action={() => {
                    action()
                    reset()
                }}
                off={() => setVisible(false)}
                modalVisible={visible}
            >
                {children}
            </ConfirmModal>
        </ConfirmContext.Provider>
    )
}