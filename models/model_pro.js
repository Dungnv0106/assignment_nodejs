import mongoose from 'mongoose';

const productScheme = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        minLength: 3
    }, 
    price: {
        type: Number, 
        required: true, 
    },
    description: {
        type: String, 
        maxLength: 300
    }
});

export default mongoose.model("Product", productScheme);