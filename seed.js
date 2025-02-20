import "reflect-metadata";
import { AppDataSource } from "./main/database/config.js";
import { User } from "./main/database/entities/user.js";
import { Gun } from "./main/database/entities/gun.js";
import { Target } from "./main/database/entities/target.js";

async function seedDatabase() {
    try {
        // Подключаемся к базе
        await AppDataSource.initialize();
        console.log("✅ Успешное подключение к БД");

        const userRepository = AppDataSource.getRepository(User);
        const gunRepository = AppDataSource.getRepository(Gun);
        const targetRepository = AppDataSource.getRepository(Target);

        // Создаём тестовых пользователей
        const users = [];
        for (let i = 1; i <= 5; i++) {
            const user = userRepository.create({
                name: `Имя${i}`,
                secondName: `Фамилия${i}`,
            });
            users.push(await userRepository.save(user));
        }

        // Создаём оружие и назначаем его пользователям
        for (let i = 0; i < users.length; i++) {
            const gun = gunRepository.create({
                currentID: `GUN-${i + 1}`,
                availableMagazines: Math.floor(Math.random() * 10),
                bulletsInMagazine: Math.floor(Math.random() * 30),
                additionalBullets: Math.floor(Math.random() * 100),
                gunStatus: "active",
                user: users[i], // Привязываем к пользователю
            });
            await gunRepository.save(gun);
        }

        // Создаём мишени и привязываем их к пользователям
        for (let i = 0; i < users.length; i++) {
            const target = targetRepository.create({
                currentID: `TARGET-${i + 1}`,
                user: users[i], // Привязываем к пользователю
            });
            await targetRepository.save(target);
        }

        console.log("✅ База успешно заполнена тестовыми данными");
        process.exit();
    } catch (error) {
        console.error("❌ Ошибка при заполнении БД:", error);
        process.exit(1);
    }
}

// Запуск скрипта
seedDatabase();
