import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/owners/entities/owner.entity';
import { Pet } from 'src/pets/pet.entity';
import { Repository } from 'typeorm';
import { ownersSeed, petsSeed, rolesSeed, usersSeed } from './data';
import { CreateOwnerInput } from 'src/owners/dto/create-owner.input';
import { CreatePetInput } from 'src/pets/dto/create-pet.input';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/users/entities/role.entity';
import { CreateRoleInput } from 'src/users/dto/create-role.input';

@Injectable()
export class SeederDataService {
  /**
   * Create an instance of class.
   *
   * @constructs
   *
   * @param {Repository<Owner>} ownerRepository
   * @param {Repository<Pet>} petRepository
   */
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}
  /**
   * Seed all languages.
   *
   * @function
   */
  createOwners() {
    return ownersSeed.map(async (owner: CreateOwnerInput) => {
      return await this.ownerRepository
        .findOne({
          where: {
            name: owner.name,
          },
        })
        .then(async (dbOwner) => {
          // We check if a language already exists.
          // If it does don't create a new one.
          if (dbOwner) {
            return Promise.resolve(null);
          }
          return Promise.resolve(
            // or create(language).then(() => { ... });
            await this.ownerRepository.save(owner),
          );
        })
        .catch((error) => Promise.reject(error));
    });
  }

  createPets() {
    return petsSeed.map(async (pet: CreatePetInput) => {
      return await this.petRepository
        .findOne({
          where: {
            name: pet.name,
          },
        })
        .then(async (dbPet) => {
          // We check if a language already exists.
          // If it does don't create a new one.
          if (dbPet) {
            return Promise.resolve(null);
          }
          return Promise.resolve(
            // or create(language).then(() => { ... });
            await this.petRepository.save(pet),
          );
        })
        .catch((error) => Promise.reject(error));
    });
  }

  createUsers() {
    return usersSeed.map(async (user: CreateUserInput) => {
      return await this.userRepository
        .findOne({
          where: {
            username: user.username,
          },
        })
        .then(async (dbPet) => {
          // We check if a language already exists.
          // If it does don't create a new one.
          if (dbPet) {
            return Promise.resolve(null);
          }
          return Promise.resolve(
            // or create(language).then(() => { ... });
            await this.userRepository.save(user),
          );
        })
        .catch((error) => Promise.reject(error));
    });
  }

  createRoles() {
    return rolesSeed.map(async (role: CreateRoleInput) => {
      return await this.roleRepository
        .findOne({
          where: {
            rolename: role.rolename,
          },
        })
        .then(async (dbPet) => {
          // We check if a language already exists.
          // If it does don't create a new one.
          if (dbPet) {
            return Promise.resolve(null);
          }
          return Promise.resolve(
            // or create(language).then(() => { ... });
            await this.roleRepository.save(role),
          );
        })
        .catch((error) => Promise.reject(error));
    });
  }
}
