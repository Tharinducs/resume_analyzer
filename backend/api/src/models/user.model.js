import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        name: { type: String,required: true},
        email: { type: String, unique: true ,required: true},
        picture: String,
        providerUserId: String,
        provider: { type: String, default: "local" },
        mobileNo: { type: String, unique: true },
        address: String,
        password:{ type: String , select: false}
    },
    { timestamps: true }
)

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.set("toJSON", {
  transform: (_, ret) => {
    delete ret.password;
    return ret;
  },
});

export default mongoose.Model("User",userSchema)