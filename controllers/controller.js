import User from '../models/UserModel.js';
/*
import  from '../models/FoodSpotModel.js';
import  from '../models/ReviewModel.js';
import  from '../models/LocationModel.js';
import db from '../models/db.js';
*/

const controller = {

    isPrivate: (req, res, next) => {
        if (req.session.user) {
            return next();
        } else {
            res.redirect('/signin');
        }
    },

    isPublic: (req, res, next) => {
        if (req.session.user) {
            res.redirect("/signin", { layout: false });
        } else {
            return next();
        }
    },

    getLogout: (req, res) => {
        if (req.session) {
            req.session.destroy(() => {
                res.clearCookie("connect.sid");
                console.log("Session successfully destroyed.");
                res.redirect("/signin");
            });
        }
    },

    getSignIn: (req, res) => {
        res.render("login", { layout: false });
    },

    getRegister: (req, res) => {
        res.render("signup", { layout: false });
    },

    getHome: (req, res) => {
        res.render("homepage", { layout: false });
    },


    getProfile: (req, res) => {
        res.render("user", { layout: false });
    },

    getRestaurantPage: (req, res) => {
        res.render("restaurant", { layout: false });
    },

    //this is for getting the review page
    getReviewPage: (req, res) => {
        res.render("review", { layout: false });
    },

    //This handles adding new users to the database
    postAddAccount: (req, res) => {
        console.log("/submit request received:");
        console.log(req.body);
        const myUser = new User({
            email: req.body.email,
            givenName: req.body.givenName,
            lastName: req.body.lastName,
            password: req.body.password,
            username: req.body.username,
            role: req.body.role
        });
        myUser.save().then((result) => {
            res.sendStatus(200);
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    },

    postCheckAccount:(req, res) => {
        console.log("/login request received:");
        console.log(req.body);
    
        try{
            //const check = User.findOne({ email: req.body.email, password: req.body.password});
            User.findOne({email: req.body.email, password: req.body.password}).lean().exec().then(result => {
                if(result){
                    res.json(result)
                    // const result = req.body.password === res.password;
                    // if (result) {
                    // 	//res.render("homepage", {layout:false});
                    // 	res.send(result)
                    // } else {
                    // 	alert("Password is incorrect");
                    // }
                }else {
                    res.json("")
                }
            })
        }catch{
            alert("ERROR");
        }
        
        // User.findOne({ $and: [{ email: {$eq:req.body.email} }, { password: {$eq:req.body.password} }] })
        // .then((result)=>{
        // 	res.render("homepage", {layout:false});
        // }).catch((err)=>{
        // 	console.log(err);
        // });
    }}

export default controller;