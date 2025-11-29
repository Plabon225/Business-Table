import ProductModel from '../models/ProductModel.js';

export const CreateProduct = async (req, res) => {
    try {
        const product = await ProductModel.create(req.body);
        res.status(200).json({ status: "success", data: product });
    } catch (err) {
        res.status(400).json({ status: "fail", message: err.message });
    }
}

export const ProductList = async (req, res) => {
    try {
        let pageNo = Number(req.params.pageNo);
        let perPage = Number(req.params.perPage);
        let searchValue = req.params.searchKeyword;
        let skipRow = (pageNo - 1) * perPage;
        let data;

        if (searchValue !== "0") {
            let SearchRgx = { $regex: searchValue, $options: "i" };
            let SearchQuery = {
                $or: [
                    { title: SearchRgx },
                    { category: SearchRgx },
                    { subcategory: SearchRgx },
                    { brand: SearchRgx },
                    { remark: SearchRgx },
                ],
            };

            data = await ProductModel.aggregate([
                {
                    $facet: {
                        Total: [{ $match: SearchQuery }, { $count: "count" }],
                        Rows: [{ $match: SearchQuery }, { $skip: skipRow }, { $limit: perPage }],
                    },
                },
            ]);
        } else {
            data = await ProductModel.aggregate([
                {
                    $facet: {
                        Total: [{ $count: "count" }],
                        Rows: [{ $skip: skipRow }, { $limit: perPage }],
                    },
                },
            ]);
        }

        res.status(200).json({ status: "success", data: data });
    } catch (err) {
        res.status(500).json({ status: "error", error: err.message });
    }
};
