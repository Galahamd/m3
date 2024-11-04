import { Request, Response } from "express"
import IUsuer from "../interfaces/IUser";
import { getAllUsersService, getUserByIdService, postCreateUserService, postUserLoginService } from "../services/UserServices";
import IUsuerDto from "../dtos/IUserDto";
import ICredentialsDto from "../dtos/ICredentialsDto";
import User from "../entities/User";


export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users: User[] = await getAllUsersService();
    res.status (200).json(users);
  } catch (error) { //* Verificar Instancia de error
    res.status(400).json({ error: "Error al obtener los usuarios" });
  }
}

export const getUserByIdController = async (req: Request<{id: string}>, res: Response) => {
  const { id } = req.params;  
  try {
    const user = await getUserByIdService (Number (id));
    res.status (200).json({
      "id": user.id,
      "name": user.name,
      "email": user.email,
      "birthdate": user.birthdate,
      "nDni": user.nDni,
      appointments: user.userAppointmens
    });
    console.log (user);
  } catch (error: any) {
      res.status(400).json({
        message: error.message
      })
    }
}

export const postUserRegisterController = async (req: Request, res: Response) => {
  try {
    // const { name, email, birthdate, nDni, username, userpassword } = req.body;
    const userDTO : IUsuerDto = req.body;
    const newUser : User = await postCreateUserService ( userDTO );
    res.status (201).json (newUser);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
export const postUserLoginController = async (req: Request, res: Response) => {
  try {
    const { username, userpassword }: ICredentialsDto = req.body;
    const userExist = await postUserLoginService ({ username, userpassword });

    if (userExist.login) {
      res.status(200).json({
        "login": true,
        "user": {
          "id": userExist.user.id,
          "name": userExist.user.name,
          "email": userExist.user.email,
          "birthdate": userExist.user.birthdate,
          "nDni": userExist.user.nDni
        }
      });
    }
  } catch (error: any) {
    res.status(404).json({
      messsage: error.message
    });
  }
}
