const express = require('express');
const router = express.Router();
const Product = require('../models/product');
/*
INFO:Get All The Products
URL:127.0.0.1:5000/api/products
METHOD:GET
FIELDS: No-fields
*/
router.get('/products',async(request,response)=>{
   try{
       let products = await Product.find()
       response.status(200).json(products);
   }
   catch(error){
    response.status(500).json({
        error:error
    })
   }
});
/*
INFO:Get A Single Product
URL:127.0.0.1:5000/api/products/:id
METHOD:GET
FIELDS: No-fields
*/
router.get('/products/:id',async(request,response)=>{
    let productId = request.params.id;
    try{
        let product = await Product.findById(productId)
        response.status(200).json(product);
    }
    catch(error){
     response.status(500).json({
         error:error
     })
    }
});
/*
INFO:Create A Product
URL:127.0.0.1:5000/api/products/
METHOD:POST
FIELDS: name,image,price,qty,info
*/
router.post('/products',async(request,response)=>{
    try{
   let newProduct ={
       name: request.body.name,
       image: request.body.image,
       price:request.body.price,
       qty:request.body.qty,
       info:request.body.info
   }
   let product = await Product.findOne({name:newProduct.name});
   if(product){
       return response.status(400).json({
           result:'failed',
           message:'product is already exists'
       });
   }

    product = new Product(newProduct);
    product = await product.save();
    response.status(200).json(product)
   }
   catch(error){
       response.status(500).json({
           error:error
       })
   }
});

/*
INFO: Update A Product
URL:127.0.0.1:5000/api/products/:id
METHOD:PUT
FIELDS: name,image,price,qty,info
*/
router.put('/products/:id',async(request,response)=>{
    let productId = request.params.id;
    try{
    let updatedProduct ={
        name: request.body.name,
        image: request.body.image,
        price:request.body.price,
        qty:request.body.qty,
        info:request.body.info
    }

    let product = await Product.findById(productId);
    if(product){
        product = await Product.findByIdAndUpdate(productId,
           {$set: updatedProduct},
           {new:true} );
           response.status(200).json(product);
    }
    else{
        return response.status(400).json({
            result: 'failed',
            message:' no product is found to update'
        })
    }
}
    catch(error){
        response.status(500).json({
            error:error
        })
    }
 });


/*
INFO: Delete A Product
URL:127.0.0.1:5000/api/products/:id
METHOD:DELETE
FIELDS: no-fields
*/
router.delete('/products/:id',async(request,response)=>{
    let productId = request.params.id;
    try{
        let product = await Product.findByIdAndDelete(productId);
        response.status(200).json(product)
    }
    catch(error){
        response.status(500).json({
            error:error
        });

    }
});

module.exports = router;