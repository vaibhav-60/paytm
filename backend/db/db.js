const mongoClient =  require("mongoose")

const url = "";

const dataBase = mongoClient.connect(url, function(err, db) {
    if(err) throw err;
    console.log("database Connected")
})

export default dataBase
