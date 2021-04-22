// app.get("", (req, res) => {
//   res.send("<h1>Weather</h1>");
// });

// // app.get("/help", (req, res) => {
// //   ////this is for object
// //   //   res.send({
// //   //     name: "cath",
// //   //     age: 27,
// //   //   });

// //   ////////////////////////////
// //   ///this is for array
// //   res.send([
// //     {
// //       name: "cath",
// //       age: 22,
// //     },
// //     {
// //       name: "jay",
// //       age: 25,
// //     },
// //   ]);
// // });

// // app.get("/about", (req, res) => {
// //   res.send("<h1>ABOUT PAGE</h1>");
// // });
// const path = require("path");
// const express = require("express");
// const hbs = require("hbs");
// const geoCode = require("./utils/geoCode");
// const forecast = require("./utils/forecast");

// const app = express();

// //customize location of the index or hbs files define paths
// const publicDirectoryPath = path.join(__dirname, "../public");
// const viewsPath = path.join(__dirname, "../templates/views");
// const partialsPath = path.join(__dirname, "../templates/partials");

// //index hbs setup view and engine, hbs
// app.set("view engine", "hbs");
// app.set("views", viewsPath);
// hbs.registerPartials(partialsPath);

// //about and help access//setup static to serve
// app.use(express.static(publicDirectoryPath));

// app.get("", (req, res) => {
//   res.render("index", {
//     title: "Weather App",
//     name: "Cathyrine Marpa",
//   });
// });

// app.get("/about", (req, res) => {
//   res.render("about", {
//     title: "About Me",
//     name: "Cathyrine Marpa",
//   });
// });

// app.get("/help", (req, res) => {
//   res.render("help", {
//     message: "How can i help you?",
//     title: "Help",
//     name: "Cathyrine Marpa",
//   });
// });

// app.get("/weatherview", (req, res) => {
//   if (!req.query.address) {
//     //if walang address sa search bar
//     return res.send({
//       error: " You need to provide address term!",
//     });
//   }
//   console.log(req.query.address); // pag may address sa search bar
//   res.send({
//     location: "Korea",
//     temp: 45,
//     weather_descrip: "cloudy",
//     address: req.query.address, //kunin nya yung output na sinearch mo then iddisplay nya or fetch nya yung value
//   });
// });

// app.get("/product", (req, res) => {
//   if (!req.query.search) {
//     return res.send({
//       error: "Error Message Provide Search Term",
//     });
//   }
//   console.log(req.query.search);
//   res.send({
//     products: [],
//   });
// });

// app.get("/about/*", (req, res) => {
//   res.render("error", {
//     title: "About Page Not Found",
//     message: "About Page Article Not Found",
//     name: "Cathyrine Marpa",
//   });
// });

// app.get("/help/*", (req, res) => {
//   res.render("error", {
//     title: "Help Page Not Found",
//     message: "Help Article Not Found",
//     name: "Cathyrine Marpa",
//   });
// });

// app.get("*", (req, res) => {
//   res.render("error", {
//     title: "404 PAGE",
//     message: "Page Not Found",
//     name: "Cathyrine Marpa",
//   });
// });

// /////server start

// app.listen(3000, () => {
//   console.log("Server is Up on port 3000");
// });

//////////////////////////////////////////////////////

const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//customize location of the index or hbs files define paths
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//index hbs setup view and engine, hbs
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//about and help access//setup static to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Cathyrine Marpa",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Cathyrine Marpa",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "How can i help you?",
    title: "Help",
    name: "Cathyrine Marpa",
  });
});

app.get("/weatherview", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Error Message Provide Search Term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/about/*", (req, res) => {
  res.render("error", {
    title: "About Page Not Found",
    message: "About Page Article Not Found",
    name: "Cathyrine Marpa",
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Help Page Not Found",
    message: "Help Article Not Found",
    name: "Cathyrine Marpa",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404 PAGE",
    message: "Page Not Found",
    name: "Cathyrine Marpa",
  });
});

/////server start

app.listen(port, () => {
  console.log("Server is Up on port" + port);
});
