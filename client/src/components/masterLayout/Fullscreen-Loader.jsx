import { useSelector } from "react-redux";

function Loader() {
    const loader = useSelector((state) => state.setting.loader);

    return (
        <div className={`loader-overlay ${loader}`}>
            <div className="spinner"></div>
        </div>
    );
}

export default Loader;
