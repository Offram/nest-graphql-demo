import { Injectable } from '@nestjs/common';
import { Pet } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreatePetInput } from './dto/create-pet.input';
import { OwnersService } from 'src/owners/owners.service';
import { Owner } from 'src/owners/entities/owner.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petsRepository: Repository<Pet>,
    private ownerService: OwnersService,
  ) {}

  async createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepository.create(createPetInput); // newPet = new Pet(); new.name= input.name

    return this.petsRepository.save(newPet); // insert
  }

  async findAll(): Promise<Pet[]> {
    return this.petsRepository.find(); // SELECT * pet
  }

  async findOne(id: number): Promise<Pet> {
    return this.petsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  getOwner(ownerId: number): Promise<Owner> {
    return this.ownerService.findOne(ownerId);
  }
}
