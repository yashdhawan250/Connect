const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;


const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function(email,password,done){
        User.findOne({email:email},
            function(err,user){
                if(err){
                    console.log("Error in finding user");
                    return done(err);
                }

                if(!user|| user.password!=password){
                        console.log('Invalid username');
                        return done(null,false);
            }

                return done(null,user);
        });
    }
));


//serialize user to decide which key to store in the session

passport.serializeUser(function(user,done){

    done(null,user.id);
});

// deserialize user from the key in the session

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user');
            return done(err);
        }

        return done(null,user);
    });
});


module.exports= passport;