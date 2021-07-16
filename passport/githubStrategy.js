const passport=require('passport');
const githubStrategy=require('passport-github').Strategy;
const User=require('../models/users');
const crypto=require('crypto-js');

module.exports = () => {
passport.use(new githubStrategy({
    clientID:process.env.GITHUB_ID,
    clientSecret:process.env.GITHUB_SECRET,
    callbackURL:'http://39.115.162.208:30000/auth/github/callback'

},async(accessToken,refreshToken,profile,done)=>{
    try {
        console.log(profile);
        const exUser = await User.findOne({
          where: {email:profile.id,provider:'github'},
        });
        if (exUser) {
          done(null, exUser);
        } else {
           
          const newUser = await User.create({
            email:profile.id,
            name: profile.username,
            password: profile.id,
            provider:'github'
          });
          done(null, newUser);
        }
      } catch (error) {
        console.error(error);
        done(error);
      }
}

));


}
