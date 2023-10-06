"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//const mongodbUri = process.env.MONGODB_URI as string || "mongodb://myuser:mypassword@localhost:27017";
//const mongodbUri = process.env.MONGODB_URI as string || "mongodb://localhost:27017";
async function connectDB(mongodbUri) {
    //const mongodbUri = "mongodb://localhost:27017";
    await mongoose_1.default.connect(mongodbUri);
    const db = mongoose_1.default.connection;
    try {
        db.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });
        db.once('open', () => {
            console.log('Connected to MongoDB');
        });
    }
    catch (e) {
        console.log(e);
    }
}
exports.connectDB = connectDB;
// Now, you can use `db` to interact with your MongoDB database
//export default db;
//# sourceMappingURL=moongose_config.js.map