import express from 'express';
import {
    getSubModulesByTaskId,
    addSubModule,
    updateSubModule,
    deleteSubModule
} from '../controllers/subModuleController.js';

const router = express.Router();

router.get('/:taskId', getSubModulesByTaskId);
router.post('/', addSubModule);
router.put('/:id', updateSubModule);
router.delete('/:id', deleteSubModule);

export default router;
