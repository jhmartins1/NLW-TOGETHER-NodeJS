import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
  // Receber o token
  const authToken = request.headers.authorization
  // Validar se token está preenchido
  if(!authToken){
    return response.status(401).end();
  }
  const [, token] = authToken.split(" ");

  // Validar se token é valido
  try {
    const { sub } = verify(token, "da4bd03ddffa7ec45defb2758681a3d9") as IPayload;
    request.user_id = sub
    return next();
  }catch(err){
    return response.status(401).end();
  }
  // Recuperar informações do usuario
}