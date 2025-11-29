import toast from "react-hot-toast";

class FormHelper {
    static ErrorToast(msg) {
        toast.error(msg, { position: "bottom-center" });
    }

    static SuccessToast(msg) {
        toast.success(msg, { position: "bottom-center" });
    }
}

export default FormHelper;
