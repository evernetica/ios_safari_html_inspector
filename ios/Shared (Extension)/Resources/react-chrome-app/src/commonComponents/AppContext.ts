import {createContext, useContext} from "react";

const AppContext = createContext({
    authToken: '',
    setAuthToken: () => null,
    refreshToken: '',
    setRefreshToken: () => null,
})
const AppContextProvider = AppContext.Provider
const useAppContext = () => useContext(AppContext)

export {AppContextProvider, useAppContext}
