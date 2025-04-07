import { Hono } from 'hono';
import {
  createAchat,
  getAllAchats,
  getAchatById,
  updateAchat,
  deleteAchat,
  getDistinctTypes,
  getDistinctCategories,
  getDistinctDeplacements,
} from '../controllers/achatController.js';

const router = new Hono();

// Routes CRUD
router.post('/', createAchat);                // ✅ Create
router.get('/', getAllAchats);                // 📥 Read all
router.get('/:id', getAchatById);             // 🔍 Read by ID
router.put('/:id', updateAchat);              // ✏️ Update
router.delete('/:id', deleteAchat);           // ❌ Delete

// Routes custom // revoir pour passer un mot cles 
router.get('/distinct/type', getDistinctTypes);             // 🎯 Types distincts
router.get('/distinct/categorie', getDistinctCategories);   // 🎯 Catégories distinctes
router.get('/distinct/deplacement', getDistinctDeplacements); // 🎯 Déplacements distincts

export default router;
