import Router from 'express';
import { signIn, signOut, signUp } from '../controllers/auth.controller.js';

const authRouter = Router();

// Path: /api/v1/auth
authRouter.post('/sign-up',signUp);
// Path: /api/v1/auth
authRouter.get('/sign-up', (req, res) => {
    res.send({ title: 'GET sign-up' });
});

authRouter.post('/sign-in', signIn);

authRouter.post('/sign-out',signOut);

export default authRouter;
