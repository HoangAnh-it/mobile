import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

import PublicStackScreen from "./public"
import PrivateStackScreen from "./private/index"
import useAxios from '../hooks/useAxios';
import useAuth from '../hooks/useAuth';

export default function Routes({ navigation }) {
    console.log('init routes')
    const [loading, setLoading] = React.useState(true)
    const axios = useAxios()
    const { auth, authDispatch } = useAuth()._j

    React.useEffect(() => {
        if (auth.isLoggedIn) {
            setLoading(false)
            return
        }
        let token;
        (async () => {
            token = await AsyncStorage.getItem("token")
            console.log("TOKEN EXISTED:::", token)
            if (token?.trim()) {
                setLoading(true)
                axios.get(`/auth/token/${token}`)
                    .then(res => {
                        if (res.status === 200) {
                            console.log(res.data)
                            authDispatch({
                                type: "LOGIN",
                                payload: {
                                    id: res.data.id,
                                    role: res.data.role,
                                    token: token
                                }
                            })
                            setLoading(false)
                        }
                    })
                    .catch(err => {
                        console.log("No token found :::", JSON.stringify(err))
                        setLoading(false)
                    })
            } else {
                setLoading(false)
            }
        })()
    }, [])

    console.log("isLoggedIn-loading", auth.isLoggedIn, "-", loading)
    if (loading) {
        return (
            <View className="flex-1 items-center justify-center" >
                <ActivityIndicator size="large" />
            </View>
        );
    }
    
    return (
        <>
            {
                auth.isLoggedIn ?
                    <PrivateStackScreen />
                    :
                    <PublicStackScreen />
            }
        </>
    )
}