import { db } from "@ra/config";
const { Schema } = db;

const refreshTokenSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3600*24*7 } // Token expires after 7 days
});

export default db.model('RefreshToken', refreshTokenSchema);