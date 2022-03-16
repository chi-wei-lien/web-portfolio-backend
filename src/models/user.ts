import { Schema, model } from 'mongoose';

interface User {
  email: string;
}

const schema = new Schema<User>({
  email: { type: String, required: true }
});

export default model<User>('User', schema);