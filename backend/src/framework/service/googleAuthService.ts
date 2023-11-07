import { OAuth2Client } from "google-auth-library";
import configKeys from "../../config";
import { User } from "../../types/User";
const client = new OAuth2Client({
    clientId: configKeys.GOOGLE_AUTH_CLIENT_ID,
    clientSecret: configKeys.GOOGLE_AUTH_CLIENT_SECRET,
    redirectUri: configKeys.GOOGLE_AUTH_REDIRECT_URI,
  });

export const googleAuthService = () => {
     
        const verify = async (token: string) => {
            
            const user: User={
                name:"",
                email:"",
                isGoogleUser:true
            }
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: configKeys.GOOGLE_AUTH_CLIENT_ID,
            });
            
            const payload = ticket.getPayload();
            if(payload?.given_name&&payload.email){
                user.name = payload.given_name
                user.email = payload.email
            }
            
            return user
        }
    
        return {
            verify
        }   
 
}

export type GoogleAuthService = typeof googleAuthService