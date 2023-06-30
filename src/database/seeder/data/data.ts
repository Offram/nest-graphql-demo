import { CreateOwnerInput } from 'src/owners/dto/create-owner.input';
import { CreatePetInput } from 'src/pets/dto/create-pet.input';

export const ownersSeed: CreateOwnerInput[] = [
  { name: 'English' },
  { name: 'French' },
  { name: 'Spanish' },
  { name: 'Russian' },
];

export const petsSeed: CreatePetInput[] = [
  { name: 'English', ownerId: 1 },
  { name: 'French', ownerId: 2 },
  { name: 'Spanish', ownerId: 3 },
  { name: 'Russian', ownerId: 1 },
];
