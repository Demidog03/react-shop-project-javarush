import {useAppSelector} from "../../../store/store.ts";
import {type JSX, useEffect} from "react";
import {useNavigate} from "react-router";
import FullscreenSpinner from "../../../shared/ui/FullscreenSpinner.tsx";

function PublicPageGuard({ children }: { children: JSX.Element }) {
    const navigate = useNavigate()
    const { token, currentUser, isInitialized, initLoading } = useAppSelector(state => state.auth)

    useEffect(() => {
        if (isInitialized && (token && currentUser)) {
            navigate('/')
        }
    }, [token, currentUser, isInitialized]);

    if (initLoading) {
        return <FullscreenSpinner loading={initLoading} />
    }

    return children
}

export default PublicPageGuard;