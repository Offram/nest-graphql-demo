import { Injectable } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner) private ownerRepository: Repository<Owner>,
  ) {}

  create(createOwnerInput: CreateOwnerInput) {
    const newOwner = this.ownerRepository.create(createOwnerInput);
    return this.ownerRepository.save(newOwner);
  }

  findAll() {
    return this.ownerRepository.find({ relations: ['pets'] });
  }

  findOne(id: number) {
    return this.ownerRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  update(id: number, updateOwnerInput: UpdateOwnerInput) {
    return this.ownerRepository.update(
      {
        id,
      },
      updateOwnerInput,
    );
  }

  remove(id: number) {
    return this.ownerRepository.delete(id);
  }
}
