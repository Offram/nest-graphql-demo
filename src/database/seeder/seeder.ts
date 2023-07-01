import { Injectable, Logger } from '@nestjs/common';
import { SeederDataService } from './data/seeder-data.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly seederDataService: SeederDataService,
  ) {
    this.seed()
      .then(() => {
        logger.debug('Seeding complete!');
      })
      .catch((error) => {
        logger.error('Seeding failed!');
        throw error;
      });
  }

  async seed() {
    await this.owners()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding owners...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding owners...');
        Promise.reject(error);
      });

    await this.pets()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding pets...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding pets...');
        Promise.reject(error);
      });

    await this.roles()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding roles...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding roles...');
        Promise.reject(error);
      });

    await this.users()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding users...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding users...');
        Promise.reject(error);
      });
  }

  async owners() {
    return await Promise.all(this.seederDataService.createOwners())
      .then((createdOwners) => {
        // Can also use this.logger.verbose('...');
        this.logger.debug(
          'No. of owners created : ' +
            // Remove all null values and return only created languages.
            createdOwners.filter(
              (nullValueOrCreatedLanguage) => nullValueOrCreatedLanguage,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }

  async pets() {
    return await Promise.all(this.seederDataService.createPets())
      .then((createdPets) => {
        // Can also use this.logger.verbose('...');
        this.logger.debug(
          'No. of pets created : ' +
            // Remove all null values and return only created languages.
            createdPets.filter(
              (nullValueOrCreatedLanguage) => nullValueOrCreatedLanguage,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }

  async users() {
    return await Promise.all(this.seederDataService.createUsers())
      .then((createdUsers) => {
        // Can also use this.logger.verbose('...');
        this.logger.debug(
          'No. of users created : ' +
            // Remove all null values and return only created languages.
            createdUsers.filter(
              (nullValueOrCreatedLanguage) => nullValueOrCreatedLanguage,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }

  async roles() {
    return await Promise.all(this.seederDataService.createRoles())
      .then((createdRoles) => {
        // Can also use this.logger.verbose('...');
        this.logger.debug(
          'No. of roles created : ' +
            // Remove all null values and return only created languages.
            createdRoles.filter(
              (nullValueOrCreatedLanguage) => nullValueOrCreatedLanguage,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }
}
