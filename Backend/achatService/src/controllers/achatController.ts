import type { Context } from 'hono';
import Achat from '../models/achatModel.js';
import mongoose from 'mongoose';


const handleError = (error: unknown, c: Context) => {
    const errMsg = error instanceof Error ? error.message : 'An unknown error occurred';
    return c.json({ message: errMsg }, 500);
};
const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

// ✅ CREATE
export const createAchat = async (c: Context) => {
  try {
    const body = await c.req.json();
    const newAchat = new Achat(body);
    const saved = await newAchat.save();
    return c.json(saved, 201);
  } catch (err: any) {
    return c.json({ error: err.message }, 400);
  }
};

// 📥 GET all achats
export const getAllAchats = async (c: Context) => {
  try {
    const achats = await Achat.find().populate('deplacement');
    return c.json(achats);
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
};

// 🔍 GET achat by ID
export const getAchatById = async (c: Context) => {
  const id = c.req.param('id');
  if (!isValidObjectId(id)) return c.json({ error: 'Invalid ID' }, 400);

  try {
    const achat = await Achat.findById(id).populate('deplacement');
    if (!achat) return c.json({ error: 'Achat not found' }, 404);
    return c.json(achat);
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
};

// ✏️ UPDATE achat
export const updateAchat = async (c: Context) => {
  const id = c.req.param('id');
  if (!isValidObjectId(id)) return c.json({ error: 'Invalid ID' }, 400);

  try {
    const body = await c.req.json();
    const updated = await Achat.findByIdAndUpdate(id, body, { new: true });
    if (!updated) return c.json({ error: 'Achat not found' }, 404);
    return c.json(updated);
  } catch (err: any) {
    return c.json({ error: err.message }, 400);
  }
};

// ❌ DELETE achat
export const deleteAchat = async (c: Context) => {
  const id = c.req.param('id');
  if (!isValidObjectId(id)) return c.json({ error: 'Invalid ID' }, 400);

  try {
    const deleted = await Achat.findByIdAndDelete(id);
    if (!deleted) return c.json({ error: 'Achat not found' }, 404);
    return c.json({ message: 'Achat deleted' });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
};


// revoir pour passer un id ou un mot.
// 🎯 DISTINCT type (Perso / Pro)
export const getDistinctTypes = async (c: Context) => {
  try {
    const types = await Achat.distinct('type');
    return c.json(types);
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
};

// 🎯 DISTINCT catégorie
export const getDistinctCategories = async (c: Context) => {
  try {
    const categories = await Achat.distinct('categorie');
    return c.json(categories);
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
};

// 🎯 DISTINCT déplacements
export const getDistinctDeplacements = async (c: Context) => {
  try {
    const ids = await Achat.distinct('deplacement');
    return c.json(ids);
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
};
