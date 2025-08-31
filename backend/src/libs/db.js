import mongoose from "mongoose";

const db_connect = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("DB CONNECTED");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default db_connect;
