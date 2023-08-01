import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  create(createUserInput: CreateUserInput) {
    const newUser = this.usersRepository.create(createUserInput); // newPet = new Pet(); new.name= input.name

    return this.usersRepository.save(newUser); // insert
  }

  findAll() {
    return this.usersRepository.find({
      relations: ['role'],
    });
  }

  findOne(username: string) {
    return this.usersRepository.findOne({
      where: {
        username,
      },
      relations: ['role'],
    });
  }

  // createRole(createRoleInput: CreateRoleInput) {
  //   const newRole = this.rolesRepository.create(createRoleInput); // newPet = new Pet(); new.name= input.name

  //   return this.rolesRepository.save(newRole); // insert
  // }

  findAllRoles() {
    return this.rolesRepository.find({ relations: ['users'] });
  }

  findOneRole(id: number) {
    return this.rolesRepository.findOne({
      where: {
        id,
      },
    });
  }

  getRole(roleId: number): Promise<Role> {
    return this.findOneRole(roleId);
  }
}
