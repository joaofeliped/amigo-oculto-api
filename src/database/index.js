import mongoose from 'mongoose';

class Database {
  constructor() {
    this.mongo();
  }

  mongo() {
    this.mongoConnection = mongoose
      .connect('mongodb://localhost:27017/amigo-oculto', {
        useNewUrlParser: true,
        useFindAndModify: true,
      })
      .then(() => console.log('DB Connected!'))
      .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
      });
  }
}

export default new Database();
