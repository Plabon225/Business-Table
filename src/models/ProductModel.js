import mongoose from 'mongoose';

const DataSchema = mongoose.Schema({
    title: String,
    price: Number,
    special_price: String,
    category: String,
    subcategory: String,
    remark: String,
    brand: String,
    shop: String,
    shop_name: String,
    star: Number,
    product_code: String,
    stock: Boolean,
})

const Product = mongoose.model('Product', DataSchema);
export default Product;
