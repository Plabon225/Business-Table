import {configureStore} from "@reduxjs/toolkit";
import productSlice from "../state-slice/product-slice";
import settingSlice from "../state-slice/setting-slice";

export default configureStore({
    reducer: {
        settings:settingSlice,
        product:productSlice
    }
})