import {jwtDecode} from 'jwt-decode';


export interface DecodedToken {
    id: string;
    names: string;
    email: string;
    phone_number: string;
    city: string;
    country: string;
    address?: string;
    birth_date?: string;
  }

export const tokenDecoder=(): DecodedToken | null=>{
    const token = sessionStorage.getItem('token');
    if(token){
        return jwtDecode(token);
    }
    return null;
}