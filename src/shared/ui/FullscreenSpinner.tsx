import {Spinner} from "react-bootstrap";

interface FullscreenSpinnerProps {
    loading: boolean
}

function FullscreenSpinner({ loading }: FullscreenSpinnerProps) {
    if (loading) {
        return (
            <div style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }
}

export default FullscreenSpinner;
