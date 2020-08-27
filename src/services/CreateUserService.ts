import { getRepository } from "typeorm";
import User from "../models/User";

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    //Como não vai precisar fazer nada que o banco ORM não já tenha, então não precisa de criar um rep;
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({ where: { email } });

    if (checkUserExists) {
      throw new Error("Email address already used.");
    }

    const user = usersRepository.create({
      name,
      email,
      password,
    });

    await usersRepository.save(user);
    
    return user;
  }
}

export default CreateUserService;
