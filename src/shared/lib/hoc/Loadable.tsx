import {type ComponentType, Suspense} from "react";
import FullscreenSpinner from "../../ui/FullscreenSpinner.tsx";

const Loadable = (Component: ComponentType) => (props: Record<never, never>) => {
    return (
        <Suspense fallback={<FullscreenSpinner loading={true} />}>
            <Component {...props} />
        </Suspense>
    )
}

export default Loadable;