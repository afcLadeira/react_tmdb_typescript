import { useContext } from "react";

import AuthContext, { AuthContextShape } from "../context/AuthProvider";

export default function useAuth() {
    return useContext<AuthContextShape>(AuthContext)
}