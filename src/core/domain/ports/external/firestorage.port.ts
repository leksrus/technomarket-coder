import { FilePort } from "@core/domain/ports/usecases/user/file.port";


export interface FireStoragePort {
  addFile(file: FilePort, folder: string): Promise<string>
}