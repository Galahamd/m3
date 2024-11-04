// import ICreateUsuerDto from "../interfaces/ICreateUserDto";
import { userModel } from "../config/dataSource";
import ICredentialsDto from "../dtos/ICredentialsDto";
import IUsuerDto from "../dtos/IUserDto";
import User from "../entities/User";
import IUsuer from "../interfaces/IUser";
import { getAllApointmentsService } from "./AppointmentsServices";
import { createCredentialsService, validateCredentialsService } from "./CredentialsServices";

// import ICredentials from "../interfaces/ICredentials";
// const users : IUsuer[] =[
//   {
//     id: 0,
//     name: "Mauricio",
//     email: "mau@mail.com",
//     birthdate: new Date(),
//     nDni: "12345",
//     credentialsId: 0
//   }
// ];
//  const users : IUsuer[] = [];
// let userId: number = 1;


export const getAllUsersService = async (): Promise <User[]> => {
  const allUsers: User[]= await userModel.find({
    relations: { appointments: true }
  });
  return allUsers;
}

export const getUserByIdService = async (id: number) => {
  const foundUser: User | undefined = await userModel.findOne({
    where: {
      id
    },
  })
  // console.log (foundUser);
  // const user = {
  //   "id": foundUser.id,
  //   "name": foundUser.name,
  //   "email": foundUser.email,
  //   "birthdate": foundUser.birthdate,
  //   "nDni": foundUser.nDni,
  // } ;
  // console.log ("Usuario",user);
  if (!foundUser)
    throw new Error ("Usuario no encontrado");
  const allAppointments = await getAllApointmentsService();
  const userAppointmens = allAppointments.filter (appointment => appointment.user.id === foundUser.id)
  return {
    "id": foundUser.id,
    "name": foundUser.name,
    "email": foundUser.email,
    "birthdate": foundUser.birthdate,
    "nDni": foundUser.nDni,
    userAppointmens
  };
}


export const postCreateUserService = async (createUserDTO: IUsuerDto): Promise <User> => {
  const newUser = await userModel.create(createUserDTO);
  
  const newCredential = await createCredentialsService ({
    username: createUserDTO.username,
    userpassword: createUserDTO.userpassword
  });
  newUser.credentialsId = newCredential;

  await userModel.save(newUser);
  return newUser;
  // const newUser: IUsuer = {
  //   id: userId++,
  //   name: createUserDTO.name,
  //   email: createUserDTO.email,
  //   birthdate: createUserDTO.birthdate,
  //   nDni: createUserDTO.nDni,
  //   credentialsId: newCredentialsId.id
  // }
  // users.push (newUser);
}


// export const postUserLoginService = async (credentialsDTO: ICredentialsDto): Promise<User | undefined> => {
//   const userExist = await validateCredentialsService(credentialsDTO);
//   if (userExist) {
//     const user = await userModel.findOne({
//       where: {
//         credentialsId: userExist.id // Assuming that validateCredentialsService returns a credential with id
//       }
//     });
//     return user;
//   }
//   return undefined;
// }



export const postUserLoginService = async (credentialsDTO: ICredentialsDto) => {
  const userExist = await validateCredentialsService (credentialsDTO);
  if (userExist){
    const user = await getUserByIdService(userExist.id)
    return {
      "login": true,
      user
    };
    
  }
}