const {MongoClient} = require('mongodb');

async function dbConn() {
    const uri = "mongodb+srv://root:root@oopg1t4.tw9afqp.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    

    try {
        await client.connect();

        await listDatabases(client);

        await findOneField(client, "Blood Type")
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

dbConn().catch(console.error);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases: ");

    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

async function findOneField(client, fieldName) {
    const result = await client.db("admin").collection("field").findOne({name : fieldName});
    if (result) {
        console.log(`Found a listing in the collection with the name '${fieldName}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${fieldName}'`);
    }
}

