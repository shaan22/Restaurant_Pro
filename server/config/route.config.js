import jwtPassport from 'passport-jwt';

//Databases
import {UserModel} from '../database/allModels';

const JWTStrategy = jwtPassport.Strategy;
const ExtractJwt = jwtPassport.ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "charanshaan22",
};

export default (passport) => {
    passport.use(
        new JWTStrategy(options, async (jwt__payload,done) => {
            try{
                const doesUserExist = await UserModel.findById(jwt__payload.user);
                if(!doesUserExist) return done(null, false);
                return done(null, doesUserExist);
            }catch(error){
                throw new Error(error);
            }
        })
    );
};