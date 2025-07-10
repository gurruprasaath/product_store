import express from 'express';
import { postProducts, updateProducts,deleteProducts,getProducts} from '../controllers/product.controller.js';
import { get } from 'mongoose';

const router = express.Router();


router.post("/",postProducts)

router.get('/', getProducts);


router.delete("/:id",deleteProducts);


router.put('/:id', updateProducts);
export default router;