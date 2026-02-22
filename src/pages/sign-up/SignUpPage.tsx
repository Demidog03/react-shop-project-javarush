import MainLayout from "../../layouts/MainLayout.tsx";
import {Button, Form} from "react-bootstrap";
import classes from './SignUpPage.module.css'
import CustomPassword from "../../shared/ui/CustomPassword.tsx";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useNavigate} from "react-router";

const LoginFormSchema = Yup.object().shape({
    name: Yup.string().max(150, 'Name must be at most 150 characters').required('Name is required'),
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
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match"),
})

interface FormValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

function SignUpPage() {
    const navigate = useNavigate()
    const { values, errors, handleSubmit, handleChange, isValid, dirty, resetForm, handleBlur } = useFormik<FormValues>({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: (values) => {
            console.log(values)
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
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Fullname</Form.Label>
                        <Form.Control isInvalid={Boolean(errors.name)} value={values.name} onChange={handleChange} type="text" placeholder="Enter name" />
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
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

                    <Form.Group className="mb-3" controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <CustomPassword isInvalid={Boolean(errors.confirmPassword)} value={values.confirmPassword} onChange={handleChange} placeholder="Confirm Password">
                            <Form.Control.Feedback type="invalid">
                                {errors.confirmPassword}
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
