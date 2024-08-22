const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
require('dotenv').config();

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const prisma = new PrismaClient();
const SecretJWT = process.env.SECRET_JWT;

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
     async (username, password, cb) => {
        try {
            const user = await prisma.users.findFirst({
                where: {
                    username: username
                }
            });

            // const user = await prisma.$queryRaw`SELECT * FROM users WHERE LOWER(username) = ${username.toLowerCase()}`
        
            if (!user) {
                return cb(null, false, { message: 'user not found' });
            }

            const validPassword = await bcrypt.compareSync(password, user.password);

            if (validPassword === false) {
                return cb(null, false, { message: 'Invalid password' });
            }

            return cb(null, user, {message: 'Logged In Successfully'})
        } catch (error) {
            return cb(null, false, { message: 'Invalid username or password' });
        }
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: SecretJWT
    }, (jwtPayload, cb) => {
        try {
            return cb(null, jwtPayload.user);
        } catch (err) {
            return cb(err);
        }
    }
));