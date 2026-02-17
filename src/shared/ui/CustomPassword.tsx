import classes from './SharedUI.module.css'
import {Form, type FormControlProps} from "react-bootstrap";
import type {FeedbackProps} from "react-bootstrap/Feedback";
import {useState} from "react";
import {GoEye, GoEyeClosed} from "react-icons/go";

function CustomPassword(props: FormControlProps & FeedbackProps) {
    const [isVisible, setIsVisible] = useState<boolean>(false)

    function showPassword() {
        setIsVisible(true)
    }

    function hidePassword() {
        setIsVisible(false)
    }

    return (
        <div className={classes.passwordContainer}>
            <Form.Control className={classes.passwordInput} {...props} children={null} type={isVisible ? 'text' : 'password'} />
            {!props.isInvalid && !isVisible && <GoEyeClosed onClick={showPassword} className={classes.passwordEyeIcon} />}
            {!props.isInvalid &&isVisible && <GoEye onClick={hidePassword} className={classes.passwordEyeIcon} />}
            {props.children}
        </div>
    );
}

export default CustomPassword;