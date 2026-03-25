import Router from 'express';
import { getUsers, getUser } from '../controllers/user.controller.js';
import { authorize, loggedInAsAdmin } from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.get('/',loggedInAsAdmin , getUsers);

userRouter.get('/:id',authorize, getUser);

userRouter.post('/', (req, res) => {
    res.send({ title: 'Create new user'})
});

userRouter.put('/', (req, res) => {
    res.send({ title: 'UPDATE user'})
});

userRouter.delete('/:id', (req, res) => {
    res.send({ title: 'DELETE user'})
});

export default userRouter;
