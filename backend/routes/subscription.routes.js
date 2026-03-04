import Router from 'express';
import { createSubscription, getAllSubscriptions, getUserSubscriptions } from '../controllers/subscription.controller.js';
import { authorize , loggedInAsAdmin } from '../middlewares/auth.middleware.js';

const subscriptionRouter = Router();

// Admin routes
subscriptionRouter.get('/', loggedInAsAdmin, getAllSubscriptions);

subscriptionRouter.delete('/', loggedInAsAdmin, getAllSubscriptions);

// User routes
subscriptionRouter.get('/:id', (req, res) => {
    res.send( {title: 'GET subscription details'} )
});

subscriptionRouter.post('/user/create', authorize, createSubscription);

subscriptionRouter.put('/:id', (req, res) => {
    res.send( {title: 'UPDATE subscription'} )
});

subscriptionRouter.delete('/:id', (req, res) => {
    res.send( {title: 'DELETE subscription'} )
});

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send( {title: 'GET upcoming renewals'} )
});

subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send( {title: 'CANCEL subscription'} )
});

export default subscriptionRouter;
