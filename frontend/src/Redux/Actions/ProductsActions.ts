import { BackendUrl } from "../../Url";
import {
    searchStart,
    searchSuccess,
    searchFailure,
} from "../Slices/ProductsSlice.ts";

export const Searchproducts =
    (query: string) => async (dispatch: any) => {
        try {
            dispatch(searchStart());

            const res = await fetch(`${BackendUrl}/api/products/search`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query }),
            });

            const data = await res.json();

            dispatch(searchSuccess(data));

            return data;
        } catch (error: any) {
            dispatch(
                searchFailure(error.message || "Something went wrong")
            );
        }
    };