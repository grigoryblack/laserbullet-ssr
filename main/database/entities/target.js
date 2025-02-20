import { EntitySchema } from 'typeorm';
import { User } from './user.js';

export const Target = new EntitySchema({
    name: 'Target',
    tableName: 'targets',
    columns: {
        id: {
            type: 'uuid',
            primary: true,
            generated: 'uuid',
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
            inverseSide: 'target',
            nullable: true,
        },
    },
});
