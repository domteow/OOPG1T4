const {MongoClient} = require('mongodb');

async function dbConn() {
    const uri = "mongodb+srv://root:root@oopg1t4.tw9afqp.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    

    try {
        await client.connect();

        await listDatabases(client);
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