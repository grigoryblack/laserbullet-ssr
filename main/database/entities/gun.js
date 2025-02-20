import { EntitySchema } from 'typeorm';

export const Gun = new EntitySchema({
    name: 'Gun',
    tableName: 'guns',
    columns: {
        id: {
            type: 'uuid',
            primary: true,
            generated: 'uuid',
        },
        availableMagazines: {
            type: 'int',
        },
        bulletsInMagazine: {
            type: 'int',
        },
        additionalBullets: {
            type: 'int',
        },
        gunStatus: {
            type: 'varchar',
        },
        currentID: {
            type: 'varchar',
        },
        createdAt: {
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP',
        },
        deletedAt: {
            type: 'timestamp',
            nullable: true,
        },
    },
    relations: {
        user: {
            type: 'one-to-one',
            target: 'User',
            inverseSide: 'gun',
            nullable: true,
        },
    },
});
