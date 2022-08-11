import { FilePort } from "@core/domain/ports/usecases/user/file.port";

export interface CreateUserPort {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  birthDate: string;
  phone: string;
  avatarFile: FilePort;
}