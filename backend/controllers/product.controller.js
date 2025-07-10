import Product from '../models/product.js';
import mongoose from 'mongoose';

export const postProducts=async (req,res) =>{
    const product = req.body;
    if(!product.name||!product.price ||!product.image){
        return res.status(400).json({success:false,message:"Please fill all the fields"});  
    }

    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({success:true,message:"Product added successfully"});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
    
}


export const deleteProducts =async (req,res)=>{
    const {id} = req.params;
    if(mongoose.Types.ObjectId.isValid(id) === false) {
        return res.status(404).json({ success: false, message: "Invalid product ID" });
    }
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Product deleted successfully"});    
    } catch (error) {
        res.status(500).json({success:false,message:"Server Error"});
    }
    console.log("Deleting product with ID:", id);
}



export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    }
    catch (error) {
       console.error(error);
       res.status(500).json({ success: false, message: "Internal Server Error" });
    }     
}


export const updateProducts=async (req, res) => {
    const { id } = req.params;
    const productData = req.body;
    if(mongoose.Types.ObjectId.isValid(id) === false) {
        return res.status(404).json({ success: false, message: "Invalid product ID" });
    }
    try {
        const updated_product= await Product.findByIdAndUpdate(id, productData, { new: true });
        if(!updated_product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product updated successfully", data: productData });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
        console.error(error);
    }
}