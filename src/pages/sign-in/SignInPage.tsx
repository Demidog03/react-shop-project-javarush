import MainLayout from "../../layouts/MainLayout.tsx";
import {Button, Form} from "react-bootstrap";
import classes from './SignInPage.module.css'
import {type ChangeEvent, useEffect, useState} from "react";

interface FormValues {
    email: string
    password: string
}

interface FormErrors {
    email: string
    password: string
}

function SignInPage() {
    const [formValues, setFormValues] = useState<FormValues>({ email: '' , password: '' })
    const [formErrors, setFormErrors] = useState<FormErrors>({ email: '' , password: '' })
    const [isStartTyping, setIsStartTyping] = useState<boolean>(false)

    function handleSubmit(event: SubmitEvent) {
        event.preventDefault()
        console.log(formValues)
    }

    function changeEmailValue(event: ChangeEvent<HTMLInputElement>) {
        setIsStartTyping(true)
        setFormValues({ ...formValues, email: event.target.value })
    }

    function changePasswordValue(event: ChangeEvent<HTMLInputElement>) {
        setIsStartTyping(true)
        setFormValues({ ...formValues, password: event.target.value })
    }

    useEffect(() => {
        if (!formValues.email && isStartTyping) {
            setFormErrors(prev => ({ ...prev, email: 'Email is required!' }))
        }
        else {
            setFormErrors(prev => ({ ...prev, email: '' }))
        }
    }, [formValues.email, isStartTyping])

    useEffect(() => {
        if (!formValues.password && isStartTyping) {
            setFormErrors(prev => ({ ...prev, password: 'Password is required!' }))
        }
        else {
            setFormErrors(prev => ({ ...prev, password: '' }))
        }
    }, [formValues.password, isStartTyping])

    return (
        <MainLayout>
            <div className={classes.formContainer}>
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/*@ts-expect-error*/}
                <Form onSubmit={handleSubmit}>
                    <h1>Sign in</h1>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control isInvalid={Boolean(formErrors.email)} value={formValues.email} onChange={changeEmailValue} type="email" placeholder="Enter email" />
                        <Form.Control.Feedback type="invalid">
                            {formErrors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control isInvalid={Boolean(formErrors.password)} value={formValues.password} onChange={changePasswordValue} type="password" placeholder="Password" />
                        <Form.Control.Feedback type="invalid">
                            {formErrors.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </MainLayout>
    );
}

export default SignInPage;
