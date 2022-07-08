import { useState } from "react"



export const useModal = (initialState : boolean  = false): [boolean,React.Dispatch<React.SetStateAction<boolean>>,() => void] => {   

    const [modalOpen, setModalOpen] = useState<boolean>(initialState)   
    const toggle = () =>  setModalOpen(!modalOpen)   

    return [modalOpen, setModalOpen, toggle] 
}