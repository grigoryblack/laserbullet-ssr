import {EntitySchema} from "typeorm";

export const User = new EntitySchema({
    name: 'User',
    tableName: 'users',
    columns: {
        id: {
            type: 'uuid',
            primary: true,
            generated: 'uuid',
        },
        name: {
            type: 'varchar',
        },
        secondName: {
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
        gun: {
            type: 'one-to-one',
            target: 'Gun',
            inverseSide: 'user',
            joinColumn: true,
            nullable: true,
        },
        target: {
            type: 'one-to-one',
            target: 'Target',
            inverseSide: 'user',
            joinColumn: true,
            nullable: true,
        },
    },
});
