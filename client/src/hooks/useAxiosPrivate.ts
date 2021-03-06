import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { AxiosInstance, AxiosRequestConfig } from "axios";

const useAxiosPrivate = ()  : AxiosInstance => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config : AxiosRequestConfig) => {
                //code below doesnt work in typescript so changed
                // if (!config.headers['Authorization']) {
                //     config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                // }
                if (!config.headers?.Authorization) {
                    config.headers = {};
                    config.headers['Authorization']  = `Bearer ${auth?.accessToken}`
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;

                //verificar tambem 401 e enviar para o login??


                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;

                    //enviar para o login aqui ao segundo fail ??





                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;