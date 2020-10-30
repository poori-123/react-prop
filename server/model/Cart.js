const { model, SchemaTypes} = require('mongoose') ;

module.exports = model(
    'cart',
    {
        user: {
            type: SchemaTypes.ObjectId,
            ref: 'user',
            required: true,
        },
        goodsId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        imgUrl: {
            type: String,
            required: true,
        },
        price: {
            type:String,
            required: true,
        },
        count: {
            type: String,
            required: true,
        },
        selectedId: {
            type: String,
            required: true,
        },
        selectedArr: {
            type: Array,
            required: true,
        },
        choosed: {
            type: Boolean,
            default: false
        }
    }
)