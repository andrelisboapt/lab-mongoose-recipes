const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1/recipe-app";

//Method 1 : Using Async Await

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    // Run your code here, after you have insured that the connection was made
    const myRecipe = await Recipe.create({
      title: "Super Desgusting Plate",
      level: "UltraPro Chef",
      ingredients: [
        "10 eggs",
        "5 pounds of pepper",
        "1 portion of raw meat",
        "1L of beer",
        "100g of nasty mushrooms",
      ],
      cuisine: "Ironhack kitchen",
      dishType: "breakfast",
      image:
        "https://www.streamscheme.com/wp-content/uploads/2020/08/WeirdChamp.png",
      duration: 10,
      creator: "Chef Diogo Cap",
    });
    console.log(myRecipe.title);

    const insert = await Recipe.insertMany(data);
    insert.forEach(insertTitle => console.log(insertTitle.title));

    await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100});
    console.log("The duration of Rigatoni alla Genovese recipe has been sucessfully updated!!")
    
    await Recipe.deleteOne({title: "Carrot Cake"});
    console.log("The Carrot Cake recipe has been deleted sucessfully!")

    mongoose.disconnect();
  } catch (error) {
    console.log(error);
  }
};

manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */
