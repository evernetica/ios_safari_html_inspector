import {createContext, useContext, useState} from "react";

const AppContext = createContext({
    authToken: '',
    setAuthToken: () => null,
    refreshToken: '',
    setRefreshToken: () => null,
    contacts: [],
    setContacts: () => null,
    friends: [],
    orders: [],
    userInfo: {
        userName: '',
        fullName: '',
        avatar: '',
        details: {
            lifetimeEarnings: '',
            followers: '',
            following: '',
        },
        avatarThumbnailUrl: '',
        createdAt: '',
        isAutoSharePurchases: true,
        isAutoFollowNewFriends: true,
        id: ''
    },
    setUserInfo: () => {},
    friendInfo: {
        id: "",
        email: "",
        fullName: '',
        userName: "",
        avatar: "",
        avatarThumbnailUrl: "",
        phone: "",
        createdAt: "",
        followers: 0,
        followings: 0,
        lifetimeEarnings: ""
    },
    setFriendInfo: () => {},
    isLoggedOut: 'false',
    setIsLoggedOut: (value: boolean) => {}
})
const AppContextProvider = AppContext.Provider
const useAppContext = () => useContext(AppContext)

export {AppContextProvider, useAppContext}
