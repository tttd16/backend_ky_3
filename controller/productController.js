const asyncHandler = require('express-async-handler');
const productModel = require('../models/productModel');

const getProduct = asyncHandler(async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword;
    const searchQuery = keyword ? { name: { $regex: keyword } } : {};

    const totalProduct = await productModel.countDocuments(searchQuery);
    console.log(totalProduct);
    const products = await productModel
      .find(searchQuery)
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({
      products,
      totalProduct,
      page,
    });
  } catch (error) {
    res.status(401);
    throw new Error('Khong lay duoc danh sach san pham!');
  }
});

const getCategoryProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword;
  const searchQuery = keyword ? { category: [keyword] } : {};

  const totalProduct = await productModel.countDocuments(searchQuery);
  const products = await productModel
    .find(searchQuery)
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  if (!products) {
    res.status(400);
    throw new Error('Không tìm thấy tất cả sách');
  }

  res.status(200).json({
    products,
    totalProduct,
    page,
  });
});

const getProductById = asyncHandler(async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const product = await productModel.findOne({
      _id: req.params.id,
    });
    if (product) {
      res.json(product);
    } else {
      res.status(401);
      throw new Error('Khong tim thay san pham!');
    }
  } else {
    res.status(401);
    throw new Error('Khong tim thay san pham!');
  }
});

const deleteProductByID = asyncHandler(async (req, res) => {
  const check = req.params.id.match(/^[0-9a-fA-F]{24}$/);
  console.log(check);
  if (check) {
    const productDelete = await productModel.findOne({ _id: req.params.id });
    if (productDelete) {
      try {
        await productModel.deleteOne({
          _id: req.params.id,
        });
        res.status(200).send('Xoa thanh cong!');
      } catch (error) {
        res.send('loi!');
      }
    } else {
      res.status(401);
      throw new Error('Khong tim thay san pham!');
    }
  } else {
    res.status(401);
    throw new Error('Khong tim thay san pham!');
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const productFind = await productModel.findOne({
    name: req.body.name,
  });

  if (productFind) {
    res.status(400);
    throw new Error('san pham da ton tai!');
  } else {
    const newProduct = new productModel({
      name: req.body.name,
      address: req.body.address,
      tag: req.body.tag,
      price: req.body.price,
      author: req.body.author,
      pulish: req.body.pulish,
      tran: req.body.tran,
      nxb: req.body.nxb,
      page: req.body.page,
      rate: req.body.rate,
      category: req.body.category,
      description: req.body.description,
    });

    const productInsert = await productModel.insertMany(newProduct);

    if (productInsert) {
      res.status(200).json(newProduct);
    } else {
      res.status(400);
      throw new Error('them san pham khong thanh cong!');
    }
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;

  const product = await productModel.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const reviewProduct = asyncHandler(async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const productFind = await productModel.findOne({
      _id: req.params.id,
    });
    // console.log(req.params.id)
    if (productFind) {
      // const reviewExists = productFind.review.find((productReview)=>productReview.user.equals( req.user._id))

      // if(!reviewExists){
      try {
        const newReview = {
          rating: req.body.rating,
          comment: req.body.comment,
          user: req.user.name,
        };

        productFind.review = [...productFind.review, newReview];

        productFind.numReviews = productFind.review.length;

        const listRating = productFind.review.map((e) => {
          return e.rating;
        });
        const totalRating = listRating.reduce((total, currentValue) => {
          return total + currentValue;
        });

        productFind.rate = Math.round((totalRating / productFind.numReviews) * 10) / 10;
        await productFind.save();
        const productReview = await productModel.findById({ _id: req.params.id });
        res.json(productReview);
      } catch (error) {
        res.status(401);
        throw new Error('Review khong thanh cong!');
      }
      // }else{
      //     res.status(401);
      // throw new Error('Ban da tung review!');
      // }
    } else {
      res.status(401);
      throw new Error('Khong tim thay san pham!');
    }
  } else {
    res.status(401);
    throw new Error('Khong tim thay san pham!');
  }

  const productFind = await productModel.findOne({
    id: req.params.id,
  });
});

const getTop = asyncHandler(async (req, res) => {
  const selectTop = await productModel.find().sort({ rate: -1 }).limit(5);
  res.json(selectTop);
});

module.exports = {
  getProduct,
  getProductById,
  deleteProductByID,
  createProduct,
  updateProduct,
  reviewProduct,
  getTop,
  getCategoryProducts,
};
