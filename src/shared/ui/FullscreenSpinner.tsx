import {Spinner} from "react-bootstrap";

interface FullscreenSpinnerProps {
    loading: boolean
    withOverlay?: boolean
}

function FullscreenSpinner({ loading, withOverlay = false }: FullscreenSpinnerProps) {
    if (loading) {
        return (
            <div style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: withOverlay ? 'rgba(0, 0, 0, 0.3)' : 'white',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 9999
            }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }
}

export default FullscreenSpinner;
