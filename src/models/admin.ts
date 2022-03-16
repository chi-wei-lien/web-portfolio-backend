import { Schema, model } from 'mongoose';

interface Admin {
  email: string;
}

const schema = new Schema<Admin>({
  email: { type: String, required: true }
});

export default model<Admin>('Admin', schema);