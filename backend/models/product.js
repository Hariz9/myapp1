const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: ''
    },
    brand: {
        type: String,
        default: ''
    },
    price : {
        type: Number,
        default:0
    },
})

productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productSchema.set('toJSON', {
    virtuals: true,
});

exports.Product = mongoose.model('Product', productSchema);
exports.productSchema = productSchema;
