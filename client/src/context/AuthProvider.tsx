import { createContext , ReactNode, useState ,Dispatch, SetStateAction} from "react";


export type AuthContextShape = {
    auth: UserContext;
    setAuth : Dispatch<SetStateAction<UserContext>>

  };
  
export interface UserContext  {
    id?: number;
    userName?: string;
    accessToken?: string
}

const AuthContext = createContext({} as AuthContextShape)

export const AuthProvider = ({children} : {children: ReactNode}) => {

    const [auth, setAuth] = useState<UserContext>({})

    return (
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext;