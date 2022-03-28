const { MongoClient } = require('mongodb');
const { faker } = require('@faker-js/faker');
const bcrypt = require("bcryptjs")
const uri = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.6fw6e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri)
const newDocument = async () => {
  const database = client.db().collection('user')

  const randomFirstName = faker.name.firstName(); // Rowan Nikolaus
  const randomLastName = faker.name.lastName();
  const randomEmail = randomFirstName  + randomLastName + '@gmail.com'; // Kassandra.Haley@erich.biz
  const randomPhoneNumber = faker.phone.phoneNumber('01#-### ####'); // (279) 329-8663 x30233
  const randomPass = faker.internet.password();

  const saltRounds = 10
  const newPass = await bcrypt.hashSync(randomPass, saltRounds )

  const data = {
      name : randomFirstName + ' ' + randomLastName,
      email : randomEmail,
      phonenumber : randomPhoneNumber,
      password : newPass,
  }  
  
  const result = await database.insertOne(data)
  console.log('document inserted') 
}
  
  const connectMongo = async () => {
      await client.connect(err =>{
          if(err) {
              console.log(err.message)
              return
          }
          console.log('Connected to Mongo DB');
          
          for (let i = 0; i < 10; i++) {
              newDocument()
          }
          })
  
  }
  connectMongo()