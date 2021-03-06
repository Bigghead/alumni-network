import express from 'express';
import passport from 'passport';
import { Strategy } from 'passport-github2'
import Session from 'express-session';
import User from '../models/user';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.use(Session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) { done(null, user) });
passport.deserializeUser(function(user, done) { done(null, user) });

passport.use(new Strategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: 'http://localhost:8080/auth/github/callback'
}, (accesstoken, refreshToken, profile, done) => {
    User.findOne({ githubId: profile.id }, (err, user) => {

      if (err) return done(err);
      
      if (!user) {
        // new registration: create and save user in database
        user = new User({
          githubId: profile.id,
          username: profile.username,
          personal: {
            memberSince: new Date(),
            avatarUrl: profile._json.avatar_url,
            profileUrl: profile.profileUrl,
            displayName: profile._json.name ? profile._json.name : '',
            email: profile._json.email ? profile._json.email : '',
            location: profile._json.location ? profile._json.location : '',
            bio: profile._json.bio ? profile._json.bio : '',
          },
          career: {
            company: profile._json.company ? profile._json.company : '',
          }
        });
        user.save((err) => {
          if (!err) {
            return done(err, user);
          }
        });
      } else {
        // user registered previously and exists in database
        console.log('user already exists')
        return done(err, user);
      }
    });
}));

router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), ((req, res) => {
  // successfull authentication from github
  res.redirect('http://localhost:3000/verify_account');
}));

// logout user & redirect to home page
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('http://localhost:3000/');
});


export default router;
