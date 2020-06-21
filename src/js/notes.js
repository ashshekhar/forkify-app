// // Global app controller
// // Till now we have been coding in traditional JS but often we use a bunch of dev tools

// // npm -> Node package manager (a simple CLI) and Node.js is where we will be able to find all these modern web dev tools. Some of them are:
// // Babel -> Tool in modern JS Dev to convert ES6,7,8.. together called ESNext back to ES5 for complete browser support
// // Webpack -> We are using it here to bundle our ES6 modules here

// // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // We will follow MVC architecture for this app

// // Model -> Model is concerned about data and application logic
// // Controller -> Connects the Model to View
// // View -> It is responsible for getting the data from and displaying on the UI

// // So there will be multiple .js models (Names using uppercase) and equal number of .js views connected by one global controller index.js
// // If we want, we can have multiple controllers too

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import str from "./modules/Search";
// import { add as a, mult as m } from "./views/searchView";
// import * as searchView from "./views/searchView";

// console.log(
//   `Importing the string: ${str} and functions ${a(2, 5)} and ${m(2, 3)}`
// );
// console.log(
//   `Importing the string: ${str} and functions ${searchView.add(
//     2,
//     5
//   )} and ${searchView.mult(2, 3)}`
// );

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // Forkify API -> https://forkify-api.herokuapp.com/

// // axios works in more browsers than fetch
// import axios from "axios";

// ///////////////////////
// // Trying out API requests

// async function getResults(query) {
//   try {
//     // API call
//     const result = await axios(
//       `https://forkify-api.herokuapp.com/api/search?q=${query}`
//     );
//     console.log(result);
//     console.log(result.data.recipes);
//   } catch (error) {
//     console.log(error);
//   }
// }
// getResults("pizza");



// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// localStorage API -> An object of the window object that allows to save key value pairs (both strings) and stays there even when 
// the page reloads. Therefore, it is easily retrievable

// localStorage is basically an object where the keys become properties of that object and values become the value of that property