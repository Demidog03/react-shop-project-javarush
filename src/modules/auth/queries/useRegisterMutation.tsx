import {useMutation} from "@tanstack/react-query";
import type {RegisterBody} from "../apis/auth.api.types.ts";
import authApi from "../apis/auth.api.ts";

export default function useRegisterMutation() {
    return useMutation({
        mutationKey: ['register'],
        mutationFn: (body: RegisterBody) => authApi.register(body),
        onSuccess: (data) => {
           alert(data.message || 'Register successful')
        },
        onError: () => {
            alert('Register failed')
        }
    })
}