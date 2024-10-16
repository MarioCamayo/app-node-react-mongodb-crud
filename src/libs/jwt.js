
import {TOKEN_SECRET} from '../config.js'
import  jwt  from 'jsonwebtoken';
// Generar el token JWT
export const createAccessToken = (payload)=>{

  return new Promise((resolve, reject)=>{
      jwt.sign(
        payload,
        TOKEN_SECRET,
        {
          expiresIn: "1d", // El token expirará en 1 dia
        },
        (err, token) => {
          if (err) reject(err);
          resolve(token);
          
        }
      );
    })

  }

