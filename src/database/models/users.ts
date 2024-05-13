import mongoose, { Document, Schema } from 'mongoose';

const userSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false }
});

// Pre-save middleware to bcrypt the password
userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = Bun.password.hashSync(this.password, {
      algorithm: 'bcrypt'
    });
  }

  next();
});

// Compares entered password with stored password
userSchema.methods.comparePassword = async function (password: string) {
  return Bun.password.verifySync(password, this.password);
};

userSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

type UserSchema = mongoose.InferSchemaType<typeof userSchema>;

export interface User extends UserSchema, Document {
  comparePassword: (password: string) => boolean;
}

export default (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User', userSchema);
