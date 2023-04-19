import express from 'express';
import controller from '../controllers/controller.js';

const router = express();

router.get('/homepage', controller.isPublic, controller.getHome);
router.get('/signup', controller.isPublic, controller.getRegister);
router.get('/signin',controller.isPublic, controller.getSignIn);

router.get('/user', controller.isPublic, controller.getProfile);
router.get('/restaurant', controller.isPublic, controller.getRestaurantPage);
router.get('/review', controller.isPublic, controller.getReviewPage);

router.get('/logout', controller.isPublic, controller.getLogout);

router.post('/checkAccount', controller.postCheckAccount);
//router.post('/uploadPicture', controller.isPrivate, controller.postUploadPicture);
router.post('/addAccount', controller.postAddAccount);

export default router;
