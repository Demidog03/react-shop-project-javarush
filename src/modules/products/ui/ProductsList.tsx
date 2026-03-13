import classes from './Products.module.css'
import {Form, Pagination, Spinner} from "react-bootstrap";
import {type ChangeEvent, useEffect, useState} from "react";
import ProductCard from "./ProductCard.tsx";
import {addProductsToCart, removeProductsFromCart} from "../store/cart-slice.ts";
import {useAppDispatch, useAppSelector} from "../../../store/store.ts";
import type {Product} from "./products.types.ts";
import useDebounce from "../../../shared/lib/hooks/useDebounce.ts";
import useSearchProductsQuery from "../queries/useSearchProductsQuery.tsx";
import useGetProductsCountQuery from "../queries/useGetProductsCountQuery.tsx";

function ProductList() {
    const { data: maxCount } = useGetProductsCountQuery()
    const [search, setSearch] = useState('')
    const [limit, setLimit] = useState(15)
    const [page, setPage] = useState(1)

    const debouncedSearch = useDebounce(search, 400)

    const dispatch = useAppDispatch()
    const { data: serverProducts, isLoading: productsLoading } = useSearchProductsQuery(debouncedSearch, (page - 1) * limit, limit)
    const { productsIdsInCart } = useAppSelector(state => state.cart)
    const [products, setProducts] = useState<Product[]>([])
    // const timerRef = useRef(undefined as ReturnType<typeof setTimeout> | undefined)

    function addToCart(id: number) {
        dispatch(addProductsToCart(id))
    }

    function removeFromCart(id: number) {
        dispatch(removeProductsFromCart(id))
    }

    function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value
        setSearch(value)
    }

    function handleChangeLimit(event: ChangeEvent<HTMLSelectElement>) {
        const value = event.target.value as '15' | '30' | '50'
        setPage(1)
        setLimit(Number(value))
    }

    // 1. Способ без хука
    // useEffect(() => { // нажимается клавиши в инпуте
    //     if (serverProducts) {
    //         // имитируем запрос на бэк products/search?q=search
    //         if (timerRef.current) {
    //             clearTimeout(timerRef.current)
    //         }
    //
    //         timerRef.current = setTimeout(() => {
    //             setProducts(serverProducts?.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))?.map(p => ({ ...p, isInCart: productsIdsInCart.includes(p.id) })))
    //         }, 400)
    //     }
    // }, [productsIdsInCart, search, serverProducts])

    // 2. Способ хука useDebounce
    // useEffect(() => {
    //     if (serverProducts) {
    //         setProducts(serverProducts?.filter(p => p.title.toLowerCase().includes(debouncedSearch.toLowerCase()))?.map(p => ({ ...p, isInCart: productsIdsInCart.includes(p.id) })))
    //     }
    // }, [debouncedSearch, productsIdsInCart, serverProducts])

    // 3. Способ через API
    useEffect(() => {
        if (serverProducts) {
            setProducts(serverProducts?.map(p => ({ ...p, isInCart: productsIdsInCart.includes(p.id) })))
        }
    }, [productsIdsInCart, serverProducts])

    const items = Array.from({ length: Math.ceil((maxCount ?? 0) / limit) }, (_, index) => index + 1).map(c => (
        <Pagination.Item key={c} onClick={() => setPage(c)} active={c === page}>
            {c}
        </Pagination.Item>
    ))

    return (
        <div className={classes.productsListContainer}>
            <h1 className={classes.title}>Products</h1>
            <Pagination>{items}</Pagination>
            <Form.Select value={limit} onChange={handleChangeLimit} aria-label="Default select example">
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="50">50</option>
            </Form.Select>
            <Form.Control onChange={handleChangeInput} value={search} type="text" placeholder="Search products..." className="mb-4" />

            <div className={classes.cardsContainer}>
                {productsLoading
                    ? <div className={classes.spinnerContainer}><Spinner animation="border" /></div>
                    : products?.map((p, index) => (
                        <ProductCard
                            key={index}
                            id={p.id}
                            title={p.title}
                            image={p.images[0]}
                            description={p.description}
                            rating={5}
                            price={p.price}
                            isInCart={p.isInCart}
                            addToCart={addToCart}
                            removeFromCart={removeFromCart}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default ProductList;