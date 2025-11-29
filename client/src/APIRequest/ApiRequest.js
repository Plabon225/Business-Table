import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/state-slice/setting-slice";
import axios from "axios";
import {setAllProducts,setTotal} from "../redux/state-slice/product-slice";
import ErrorToast from "../helper/FormHelper"

const BaseURL="http://localhost:3000/api";

export const GetProductList = async (pageNo,perPage,searchKeyword) => {
    let URl = `${BaseURL}/ProductList/${pageNo}/${perPage}/${searchKeyword}`;
    store.dispatch(ShowLoader())

    try {
        const result = await axios.get(URl);
        store.dispatch(HideLoader())

        if (result.status === 200 && result.data['status'] === "success") {
            if (result.data['data'][0]['Rows'].length > 0) {
                store.dispatch(setAllProducts(result.data['data'][0]['Rows']));
                store.dispatch(setTotal(result.data['data'][0]['Total'][0]['count']));
            } else {
                store.dispatch(setAllProducts([]));
                store.dispatch(setTotal(0));
                ErrorToast("Error getting products");
            }
        } else {
            ErrorToast("Error getting found");
        }
    } catch (err) {
        ErrorToast("Error getting found");
        store.dispatch(HideLoader())
    }
}