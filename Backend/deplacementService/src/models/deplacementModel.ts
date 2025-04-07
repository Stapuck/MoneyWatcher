import mongoose, { Schema, Document } from 'mongoose';

export interface IDeplacement extends Document {
  name: string;
  dateDebut: Date;
  dateFin: Date;
  cadre?: string;
  duree?: number;
  ville?: string;
  pays?: string;
  description?: string;
  surDEtreFait?: boolean;
  budgetPrevisionnel?: number;
  budgetReel?: number;
}

const deplacementSchema = new Schema<IDeplacement>(
  {
    name: { type: String, required: true },
    dateDebut: { type: Date, required: true },
    dateFin: { type: Date, required: true },
    cadre: String,
    duree: Number,
    ville: String,
    pays: String,
    description: String,
    surDEtreFait: { type: Boolean, default: false },
    budgetPrevisionnel: Number,
    budgetReel: Number,
  },
  { timestamps: true }
);



const Deplacement = mongoose.model<IDeplacement>('Deplacement', deplacementSchema);
export default Deplacement;