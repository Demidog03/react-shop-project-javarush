import MainLayout from "../../layouts/MainLayout.tsx";
import {Button, Form} from "react-bootstrap";
import classes from './SignUpPage.module.css'
import CustomPassword from "../../shared/ui/CustomPassword.tsx";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useNavigate} from "react-router";
import useRegisterMutation from "../../modules/auth/queries/useRegisterMutation.tsx";

const LoginFormSchema = Yup.object().shape({
    fullName: Yup.string().max(150, 'Name must be at most 150 characters').required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Must Contain 8 Characters').required('Password is required')
        .matches(
        /^(?=.*[a-z])/,
        "Must Contain One Lowercase Character"
        )
        .matches(
            /^(?=.*[A-Z])/,
            "Must Contain One Uppercase Character"
        )
        .matches(
            /^(?=.*[0-9])/,
            "Must Contain One Number Character"
        )
        .matches(
            /^(?=.*[!@#\$%\^&\*])/,
            "Must Contain One Special Case Character"
        ),
    password_confirmation: Yup.string().oneOf([Yup.ref("password")], "Passwords must match"),
})

interface FormValues {
    fullName: string;
    email: string;
    password: string;
    password_confirmation: string;
}

function SignUpPage() {
    const navigate = useNavigate()
    const { mutate } = useRegisterMutation()
    const { values, errors, handleSubmit, handleChange, isValid, dirty, resetForm, handleBlur } = useFormik<FormValues>({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
            password_confirmation: ''
        },
        onSubmit: (values) => {
            mutate(values)
            resetForm()
        },
        validationSchema: LoginFormSchema,
        validateOnBlur: true
    })

    function goToSignInPage() {
        navigate('/sign-in')
    }

    return (
        <MainLayout>
            <div className={classes.formContainer}>
                <Form onBlur={handleBlur} onSubmit={handleSubmit}>
                    <h1>Sign up</h1>
                    <Form.Group className="mb-3" controlId="fullName">
                        <Form.Label>Full name</Form.Label>
                        <Form.Control isInvalid={Boolean(errors.fullName)} value={values.fullName} onChange={handleChange} type="text" placeholder="Enter name" />
                        <Form.Control.Feedback type="invalid">
                            {errors.fullName}
                        </Form.Control.Feedback>
                    </Form.Group>

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

                    <Form.Group className="mb-3" controlId="password_confirmation">
                        <Form.Label>Confirm Password</Form.Label>
                        <CustomPassword isInvalid={Boolean(errors.password_confirmation)} value={values.password_confirmation} onChange={handleChange} placeholder="Confirm Password">
                            <Form.Control.Feedback type="invalid">
                                {errors.password_confirmation}
                            </Form.Control.Feedback>
                        </CustomPassword>
                    </Form.Group>

                    <Button disabled={!isValid || !dirty} variant="primary" type="submit">
                        Submit
                    </Button>
                    <Button onClick={goToSignInPage} variant="link">Already have an account? Sign in</Button>
                </Form>
            </div>
        </MainLayout>
    );
}

export default SignUpPage;
