const mongodb = require('mongodb');

const client = new mongodb.MongoClient('mongodb://localhost:27017');

const connectClient = async () => {
    await client.connect();
    console.log(`Client Connected!`);
};

const getUserCollection = () =>{
    const db = client.db('sara2-db');
    const col = db.collection('users'); 

    return col; 
}

const getProductCollection = () =>{
    const db = client.db('sara2-db');
    const col = db.collection('product'); 

    return col; 
}

const insertUser =async () => {
    const col = getUserCollection();
    await col.insertOne({
        first: 'Sara',
        last: 'Pierre',
        job: 'too many',
    });
    console.log(`User Inserted`);
};

const insertProduct =async () => {
    const col = getProductCollection();
    await col.insertOne({
        Make: 'Tesla',
        Model: 'X',
        Color: 'Black',
    });
    console.log(`Product Inserted`);
};

const getUsers = async () => {
    const col = getUserCollection();
    const users = await col.find({}).toArray();

    return users;
};

const getProduct = async () => {
    const col = getProductCollection();
    const product = await col.find({}).toArray();

    return product;
};

connectClient()
.then(() => insertUser())
.then(() => getUsers())
.then((users) => console.log(users)) 
.then(() => insertProduct())
.then(() => getProduct())
.then((product) => console.log(product)) 
.then(() => client.close());

