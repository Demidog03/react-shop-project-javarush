import {useMutation} from "@tanstack/react-query";
import type {LoginBody} from "../apis/auth.api.types.ts";
import authApi from "../apis/auth.api.ts";
import {useAppDispatch} from "../../../store/store.ts";
import {addToken} from "../store/auth.slice.ts";

export default function useLoginMutation() {
    const dispatch = useAppDispatch()

    return useMutation({
        mutationKey: ['login'],
        mutationFn: (body: LoginBody) => authApi.login(body),
        onSuccess: (data) => {
            dispatch(addToken(data.token))
        },
        onError: () => {
            alert('Login failed')
        }
    })
}