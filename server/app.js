const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors());

mongoose.connect(
  `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.ajdgw.mongodb.net/test?retryWrites=true&w=majority`
);
mongoose.connection.once("open", () => {
  console.log("db connected");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("listening port 4000");
});
