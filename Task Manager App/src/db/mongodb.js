// CRUD Create Read Update Delete

// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;

const { MongoClient, ObjectId } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// const id = new ObjectId();
// console.log(id.toHexString().length);
// console.log(id.id.length);

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database");
    }
    const db = client.db(databaseName);

    // -------------------------- Delete Data

    // db.collection("tasks")
    //   .deleteOne({ description: "Learn React JS" })
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // db.collection("user")
    //   .deleteMany({ age: 21 })
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // -------------------------- Update Data

    // db.collection("tasks")
    // .updateMany(
    //   { completed: false },
    //   {
    //     $set: {
    //       completed: true,
    //     },
    //   }
    // )
    // .then((data) => {
    //   console.log(data);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });

    // db.collection("user")
    //   .updateOne(
    //     {
    //       _id: new ObjectId("614c91bd3d31e94499f85629"),
    //     },
    //     {
    //       $inc: {
    //         age: -1,
    //       },
    //     }
    //   )
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     error;
    //   });

    // const updatePromise = db.collection("user").updateOne(
    //   {
    //     _id: new ObjectId("614c91bd3d31e94499f85629"),
    //   },
    //   {
    //     $set: {
    //       name: "hos",
    //     },
    //   }
    // );

    // updatePromise
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     error;
    //   });

    // db.collection("user").updateOne(
    //   {
    //     _id: new ObjectId("614c91bd3d31e94499f85629"),
    //   },
    //   {
    //     $set: {
    //       name: "tad",
    //     },
    //   },
    //   (error, user) => {
    //     if (error) {
    //       return console.log("Unable to connect to database");
    //     }
    //     console.log(user);
    //   }
    // );

    // -------------------------- Read Data

    // db.collection("tasks").findOne(
    //   { _id: ObjectId("614c97134f586d32c3eb7754") },
    //   (error, user) => {
    //     if (error) {
    //       return console.log("Unable to connect to database");
    //     }
    //     console.log(user);
    //   }
    // );

    // db.collection("tasks")
    //   .find({ completed: false })
    //   .toArray((error, user) => {
    //     if (error) {
    //       return console.log("Unable to connect to database");
    //     }
    //     console.log(user);
    //   });

    // db.collection("tasks")
    //   .find({ completed: false })
    //   .count((error, user) => {
    //     if (error) {
    //       return console.log("Unable to connect to database");
    //     }
    //     console.log(user);
    //   });

    // db.collection("user").findOne({ age: 22 }, (error, user) => {
    //   if (error) {
    //     return console.log("Unable to connect to database");
    //   }
    //   console.log(user);
    // });

    // -------------------------- Create Data

    // db.collection("user").insertOne(
    //   {
    //     _id: id,
    //     name: "zaiat",
    //     age: 22,
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert a decument");
    //     }
    //     console.log(result);
    //   }
    // );

    // db.collection("user").insertMany(
    //   [
    //     { name: "ahmed", age: 30 },
    //     { name: "yahya", age: 62 },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert a decuments");
    //     }
    //     console.log(result);
    //   }
    // );

    // db.collection("tasks").insertMany(
    //   [
    //     { description: "Learn Node JS", completed: false },
    //     { description: "Learn Mongo DB", completed: false },
    //     { description: "Learn React JS", completed: true },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert a decuments");
    //     }
    //     console.log(result);
    //   }
    // );
  }
);
