import {useEffect, useState} from "react";
import {authInitThunk} from "../store/auth.thunks.ts";
import {useAppDispatch, useAppSelector} from "../../../store/store.ts";

function AuthInit() {
    // этот компонент работает при холодром реднере (один раз при инициализации проект)
    const [isInitialized, setIsInitialized] = useState(false)
    const { token } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!token && !isInitialized) {
            dispatch(authInitThunk())
            setIsInitialized(true)
        }
    }, [token, isInitialized])

    return null
}

export default AuthInit;
