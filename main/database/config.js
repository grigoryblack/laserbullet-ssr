import { DataSource } from 'typeorm';
import {Target} from "./entities/target.js";
import {User} from "./entities/user.js";
import {Gun} from "./entities/gun.js";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'laserbullet',
    entities: [Gun, User, Target],
    synchronize: true,
});

AppDataSource.initialize()
    .then(() => {
        console.log('📦 Success to connect Database');
    })
    .catch((err) => console.error('❌ Error to connect database:', err));
