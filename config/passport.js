const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const User = require('../models/user');

passport.use(
	new GoogleStrategy(
		{
		 clientID: process.env.GOOGLE_CLIENT_ID,
		 clientSecret: process.env.GOOGLE_SECRET,
		 callbackURL: process.env.GOOGLE_CALLBACK
		},
		async function(accessToken, refreshToken, profile, cb){
			console.log(profile)

			const user = await User.findOne({googleId: profile.id});

			if(user) return cb(null, user);

			try {
				const newUser = await User.create({
					name: profile.displayName,
					googleId: profile.id,
					email: profile.emails[0].value, 
				})
				return cb(null, newUser)

			} catch(err){
				return cb(err)
			}
		}
	)
)

passport.serializeUser(function(user, cb){
	cb(null, user._id);
})

passport.deserializeUser(function(userId, cb){
	User.findById(userId, function(err, userDocument){
		if(err) return cb(err)
		cb(null, userDocument);
	})
})