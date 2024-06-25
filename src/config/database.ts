import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://{USERNAME}:{PASSWORD}@cluster0.bl88hev.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db: any;

export const connectDB = async () => {
  try {
    await client.connect();
    db = client.db('eventManagement');
    console.log("Successfully connected to MongoDB!");
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("An unknown error occurred during MongoDB connection");
    }
    process.exit(1);
  }
};

export const getDB = () => db;
