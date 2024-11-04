import { credentialModel } from "../config/dataSource";
import Credential from "../entities/Credendials";
import ICredentialsDto from "../dtos/ICredentialsDto";

// import ICredentials from "../interfaces/ICredentials";
// const credentials : ICredentials[] = [];
// let credentialId: number = 1;

export const createCredentialsService = async (credentialsDTO: ICredentialsDto): Promise <Credential> => {
  // Verificar que no exista el email
  const newCredential: Credential = await credentialModel.create(credentialsDTO);
  await credentialModel.save (newCredential);
  return newCredential;
}

export const validateCredentialsService = async (credentialsDTO: ICredentialsDto): Promise <Credential> => {
  const foundCredential: Credential | null = await credentialModel.findOneBy ({username: credentialsDTO.username});

  if (!foundCredential)
    throw Error ("Usuario no encontrado");
  if (foundCredential.userpassword !== credentialsDTO.userpassword)
    throw Error ("Usuario o Contraseña incorectos");
  return foundCredential;
}