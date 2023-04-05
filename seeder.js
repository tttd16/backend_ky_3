
const productModel = require('./models/productModel');
const productsFake = require('./jsondata/dataProduct');

const connectDb = require('./config/database');


connectDb();

const ImportData = async ()=> {
    try{
        await productModel.insertMany(productsFake);
        
        console.log('du lieu da duoc them');

    } catch (e) {
        console.log(e);        
        console.log('khong them duoc du lieu');
    }
}

ImportData();