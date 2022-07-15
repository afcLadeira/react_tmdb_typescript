import { createContext , ReactNode, useState ,Dispatch, SetStateAction} from "react";


export type AuthContextInterface = {
    auth: UserInterface;
    setAuth : Dispatch<SetStateAction<UserInterface>>

  };
  
export interface UserInterface  {
    id?: number;
    userName?: string;
    accessToken?: string
}

const AuthContext = createContext({} as AuthContextInterface)
// const AuthContext = createContext<AuthContextShape>({} as AuthContextShape)

export const AuthProvider = ({children} : {children: ReactNode}) => {

    const [auth, setAuth] = useState<UserInterface>({})

    return (
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext;