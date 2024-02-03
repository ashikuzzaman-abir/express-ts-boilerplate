import mongoose, { Mongoose } from 'mongoose';

const connectDB = async ():Promise<void> => {
	try {
		const conn:Mongoose = await mongoose.connect(process.env.MONGO_CONNECTION_URI!, {
			//useUnifiedTopology: true,
			//useNewUrlParser: true,
		});
		console.log(`Mongo DB connected: ${conn.connection.host}`);
	} catch (error:any) {
		console.log(`error: ${error.message}`);
		process.exit(1);
	}
};

export default connectDB;