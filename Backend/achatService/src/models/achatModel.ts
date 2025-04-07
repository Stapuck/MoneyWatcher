import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IAchat extends Document {
  date: Date;
  mois: string;
  achat: string;
  type: 'Perso' | 'Pro';
  prix: number;
  commentaire?: string;
  categorie:
    | 'Alimentation'
    | 'Transport'
    | 'Compétition'
    | 'Entrainement'
    | 'Materiel'
    | 'Medical'
    | 'Coaching'
    | 'Loisir'
    | 'Soins'
    | 'Accomodation'
    | 'Energy'
    | 'Income'
    | 'Epargne';
  deplacement?: Types.ObjectId;
}

const achatSchema = new Schema<IAchat>(
  {
    date: { type: Date, required: true },
    mois: { type: String, required: true },
    achat: { type: String, required: true },
    type: { type: String, enum: ['Perso', 'Pro'], required: true },
    prix: { type: Number, required: true },
    commentaire: { type: String },
    categorie: {
      type: String,
      enum: [
        'Alimentation',
        'Transport',
        'Compétition',
        'Entrainement',
        'Materiel',
        'Medical',
        'Coaching',
        'Loisir',
        'Soins',
        'Accomodation',
        'Energy',
        'Income',
        'Epargne',
      ],
      required: true,
    },
    deplacement: { type: Schema.Types.ObjectId, ref: 'Deplacement' },
  },
  { timestamps: true }
);

const Achat = mongoose.model<IAchat>('Achat', achatSchema);
export default Achat;
