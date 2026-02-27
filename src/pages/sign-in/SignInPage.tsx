import MainLayout from "../../layouts/MainLayout.tsx";
import {Button, Form} from "react-bootstrap";
import classes from './SignInPage.module.css'
import CustomPassword from "../../shared/ui/CustomPassword.tsx";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useNavigate} from "react-router";
import FullscreenSpinner from "../../shared/ui/FullscreenSpinner.tsx";
import useLoginMutation from "../../modules/auth/queries/useLoginMutation.ts";

const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required')
})

interface FormValues {
    email: string;
    password: string;
}

function SignInPage() {
    const navigate = useNavigate()
    const { mutate, isPending } = useLoginMutation()
    const { values, errors, handleSubmit, handleChange, isValid, dirty, resetForm, handleBlur } = useFormik<FormValues>({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values) => {
            // dispatch(loginThunk(values))
            mutate(values)
            resetForm()
        },
        validationSchema: LoginFormSchema,
        validateOnBlur: true
    })

    function goToSignUpPage() {
        navigate('/sign-up')
    }

    // useEffect(() => {
    //     if (isSuccess && data) {
    //         dispatch(addToken(data.token))
    //     }
    // }, [isSuccess, data]);

    // useEffect(() => {
    //     import('../../pages/products/ProductsPage.tsx')
    // }, []);

    return (
        <MainLayout>
            <>
                {isPending && <FullscreenSpinner loading={isPending} withOverlay /> }
                <div className={classes.formContainer}>
                    <Form onBlur={handleBlur} onSubmit={handleSubmit}>
                        <h1>Sign in</h1>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control isInvalid={Boolean(errors.email)} value={values.email} onChange={handleChange} type="email" placeholder="Enter email" />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <CustomPassword isInvalid={Boolean(errors.password)} value={values.password} onChange={handleChange} placeholder="Password">
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </CustomPassword>
                        </Form.Group>

                        <Button disabled={!isValid || !dirty} variant="primary" type="submit">
                            Submit
                        </Button>
                        <Button onClick={goToSignUpPage} variant="link">Do not have an account? Sign up</Button>
                    </Form>
                </div>
            </>
        </MainLayout>
    );
}

export default SignInPage;
