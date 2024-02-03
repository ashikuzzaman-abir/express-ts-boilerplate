import express from 'express';
import createAUser from '../controllers/user/createAuser.controller';

const router = express.Router();

router.post('/', createAUser)

export default router;
