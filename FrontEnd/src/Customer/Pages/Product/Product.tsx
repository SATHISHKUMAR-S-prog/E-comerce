import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import FilterSection from "./FilterSection";
import {Box,Divider,FormControl,IconButton,InputLabel,MenuItem,Pagination,Select,useMediaQuery,useTheme,
} from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import store, { useAppDispatch, useAppSelector } from "../../../State/Store";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchAllProducts } from "../../../State/Customer/ProductSlice";
import NoProducts from "./NoProducts";

const Product = () => {
    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
    const [sort, setSort] = useState("price_low");
    const [page, setPage] = useState(1);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const { category, categoryName } = useParams();
    const { product } = useAppSelector((store) => store);
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const handleSortChange = (event: any) => {
        setSort(event.target.value);
    };

    const handlePageChanger = (value: number) => {
        setPage(value);
    };

    useEffect(() => {
        const [minPrice, maxPrice] = searchParams.get("price")?.split("-") || [];
        const color = searchParams.get("color");
        const minDiscount = searchParams.get("discount")
            ? Number(searchParams.get("discount"))
            : undefined;
        const pageNumber = page - 1;

        const newFilter = {
            category:category,
            color: color || "",
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined,
            minDiscount,
            pageNumber,
            sort,
        };

        dispatch(fetchAllProducts(newFilter));
    }, [searchParams, page, sort, dispatch]);

    useEffect(() => {
        dispatch(fetchAllProducts({ category }));
    }, [category, dispatch]);

    return (
        <div className="-z-10 mt-10">
            <div>
                <h1 className="text-3xl text-center font-bold text-slate-700 pb-5 px-9 uppercase space-x-2">
                    {categoryName}
                </h1>
            </div>
            <div className="flex flex-col lg:flex-row ">
                <section className="filter_section lg:w-[20%]">
                    {(isLarge || isFilterVisible) && <FilterSection />}
                </section>

                <div className="w-full lg:w-[80%] space-y-5">
                    <div className="flex justify-between px-9 items-center h-[40px]">
                        <div className="relative w-[50%]">
                            {!isLarge && (
                                <IconButton
                                    onClick={() => setIsFilterVisible(!isFilterVisible)}
                                >
                                    <FilterAlt />
                                </IconButton>
                            )}
                        </div>
                        <FormControl size="small" sx={{ width: "200px" }}>
                            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={sort}
                                label="Sort"
                                onChange={handleSortChange}
                            >
                                <MenuItem value={"price_low"}>Price: Low - High</MenuItem>
                                <MenuItem value={"price_high"}>Price: High - Low</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <Divider />
                    <section className="product_section grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 px-5 justify-center ">
                        {product?.products?.length > 0 ? (
                            product.products.map((item, index) => (
                                <ProductCard key={index} item={item} />
                            ))
                        ) : (
                            <div className="flex justify-center col-span-full w-full">
                                <NoProducts />
                            </div>
                        )}
                    </section>


                    <div className="flex justify-center py-10">
                    {product?.products?.length > 0 &&
                        <Pagination
                            onChange={(e, value) => handlePageChanger(value)}
                            count={10}
                            shape="rounded"
                            color="primary"
                        />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
