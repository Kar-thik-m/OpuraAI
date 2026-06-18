import { BackendUrl } from "../../Url";
import {
    compareStart,
    compareSuccess,
    compareFailure,
} from "../Slices/CompareSlice";

export const CompareProductsAction =
    (productIds: string[]) => async (dispatch: any) => {
        try {
            dispatch(compareStart());

            const res = await fetch(`${BackendUrl}/api/products/compare`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ productIds }),
            });

            const data = await res.json();

            if (data.success) {
                dispatch(compareSuccess(data.comparison));
            } else {
                dispatch(compareFailure(data.error || "Something went wrong"));
            }

            return data;
        } catch (error: any) {
            dispatch(
                compareFailure(error.message || "Something went wrong")
            );
        }
    };
