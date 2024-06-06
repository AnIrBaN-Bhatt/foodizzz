const mongoose = require('mongoose');
const mongoURL="mongodb+srv://foodizzAnirban:anirban123@cluster0.h2dw9tv.mongodb.net/foodizzmern?retryWrites=true&w=majority&appName=Cluster0"


const mongoDB = async () => {
    try {
      await mongoose.connect(mongoURL);
      console.log('Connected!');
      const fetched_data = await mongoose.connection.db.collection("food_items");
      let data=await fetched_data.find({}).toArray() ;
      const foodCategory = await mongoose.connection.db.collection("food_category");
      const categoryData = await foodCategory.find({}).toArray();
      console.log(data);
      global.food_category=categoryData;
      global.food_items = data;
    } catch (error) {
      console.log('err: ', error);
    }
  };
module.exports=mongoDB;