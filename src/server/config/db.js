// MongoDB Connection
const mongoURI = 'mongodb+srv://get:1234@se-project.qqqt0.mongodb.net/DatingApp?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(mongoURI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1); // ปิดโปรเซสทันทีหากเกิดข้อผิดพลาด
    }
  };

export default connectDB;