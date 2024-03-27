import { MongoClient } from "mongodb";

declare var process: {
  env: {
    MONGODB_URI: string;
  };
};

export async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);

  return client;
}
