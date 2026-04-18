import Router from 'express';
import { getUsers, getUser, updateUser, deleteUser, updateUserRole } from '../controllers/user.controller.js';
import { authorize, loggedInAsAdmin } from '../middlewares/auth.middleware.js';

const userRouter = Router();

// Admin only: get all users
userRouter.get('/', loggedInAsAdmin, getUsers);

// Authenticated: get single user
userRouter.get('/:id', authorize, getUser);

// Authenticated: update own profile / password (admin can update anyone)
userRouter.put('/:id', authorize, updateUser);

// Admin only: update a user's role
userRouter.patch('/:id/role', loggedInAsAdmin, updateUserRole);

// Authenticated: delete own account (admin can delete anyone)
userRouter.delete('/:id', authorize, deleteUser);

export default userRouter;
