import {lazy} from "react";
import Loadable from "./shared/lib/hoc/Loadable.tsx";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const ProductsPageLazy = Loadable(lazy(async () => {
    try {
        return await import('./pages/products/ProductsPage.tsx')
    } catch {
        window.location.reload();
    }
}))