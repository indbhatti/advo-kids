// import mongoose from 'mongoose';

// const connectMongo = async () => mongoose.connect(process.env.MONGO_URI as string);

// export default connectMongo;

import mongoose from 'mongoose';

let cachedConnection: mongoose.Connection | null = null;

const connectMongo = async (): Promise<mongoose.Connection> => {
  if (cachedConnection) {
    // If a connection exists, return it
    return cachedConnection;
  }

  try {
    // Create a new connection if one doesn't exist
    const connection = await mongoose.connect(process.env.MONGO_URI as string);

    // Cache the connection for future use
    cachedConnection = connection;

    return connection;
  } catch (error) {
    throw new Error(`MongoDB connection error: ${error}`);
  }
};

export default connectMongo;
