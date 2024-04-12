import {Context,Next} from 'hono';
import { verify }  from 'hono/jwt'
const Auth= async (c: Context,next: Next)=>{
    try {
       
        const token: string = c.req.header("Authorization").split(" ")[1]||"";
    if (token !== null || token !== undefined) {
        
        const decode = await verify(token, c.env.JWT_SECRET);
    
        if (decode) {
            
          c.set("userId", decode);
          await next();
        }  else {
            return c.body("you are unauthroized user sorry", 401);
          }
    }
     else {
          return c.body("you are unauthroized user sorry", 401);
    }
    } catch (error) {
        console.log(error);
        return c.body("you are unauthroized user sorry", 401);
    }
 
}
export default Auth;