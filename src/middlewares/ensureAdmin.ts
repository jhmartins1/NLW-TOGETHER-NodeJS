import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction){
  const { user_id } = request;
  const usersRepositories = getCustomRepository(UsersRepositories);
  const { admin } = await usersRepositories.findOne(user_id);
  // Verificar se o usuario é admin
  

  //Se ele for admin pode seguir o fluxo, entrar no controller
  if(admin){
    return next();
  }
  // 401 = Unauthorized
  return response.status(401).json({
    error: "Unauthorized",
  });
}