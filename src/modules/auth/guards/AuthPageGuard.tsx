import {useAppSelector} from "../../../store/store.ts";
import {type JSX, useEffect} from "react";
import {useNavigate} from "react-router";
import FullscreenSpinner from "../../../shared/ui/FullscreenSpinner.tsx";

function AuthPageGuard({ children }: { children: JSX.Element }) {
    const navigate = useNavigate()
    const { token, currentUser, isInitialized, initLoading } = useAppSelector(state => state.auth)

    useEffect(() => {
        if (isInitialized && (!token || !currentUser)) {
            navigate('/sign-in')
        }
    }, [token, currentUser, isInitialized]);

    if (initLoading) {
        return <FullscreenSpinner loading={initLoading} />
    }

    return children
}

export default AuthPageGuard;