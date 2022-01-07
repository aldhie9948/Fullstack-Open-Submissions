const mongoose = require("mongoose");

// ambil password dari argument
const password = process.argv[2];
// url mongoDB
const url = `mongodb+srv://aldhie33:${password}@cluster0.yxftk.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

// cek argument
if (process.argv.length < 3 || process.argv.length > 5) {
  console.log(
    `please check again the arguments: 
    - node mongo.js <password> <name> <number>
    - node mongo.js <password>`
  );
  process.exit(1);
}

// init connect mongoDB
mongoose.connect(url);

// buat schema db
const personSchema = mongoose.Schema({
  name: String,
  number: String,
});

// buat model db by schema person
const Person = mongoose.model("Person", personSchema);

// init new data person
const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
});

if (process.argv.length === 3) {
  Person.find({}).then((res) => {
    console.log(`phonebook:`);
    res.forEach((p) => console.log(`${p.name} ${p.number}`));
    mongoose.connection.close();
    process.exit(1);
  });
} else if (process.argv.length > 3) {
  person.save().then((res) => {
    console.log(`added ${res.name} | number ${res.number}`);
    mongoose.connection.close();
  });
}
