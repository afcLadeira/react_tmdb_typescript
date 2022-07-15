import { useContext } from "react";

import AuthContext, { AuthContextInterface } from "../context/AuthProvider";

export default function useAuth() {
    return useContext<AuthContextInterface>(AuthContext)
}