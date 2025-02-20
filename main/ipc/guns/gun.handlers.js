import { ipcMain } from "electron";
import { AppDataSource } from "../../database/config";
import { Gun } from "../../database/entities/gun";

const gunRepository = AppDataSource.getRepository(Gun);

// 📌 Получить все оружия
ipcMain.handle("get-guns", async () => {
    return await gunRepository.find({ relations: ["user"] });
});

// 📌 Получить одно оружие по ID
ipcMain.handle("get-gun", async (_event, id) => {
    return await gunRepository.findOne({ where: { id }, relations: ["user"] });
});

// 📌 Создать новое оружие
ipcMain.handle("create-gun", async (_event, gunData) => {
    const newGun = gunRepository.create(gunData);
    return await gunRepository.save(newGun);
});

// 📌 Обновить оружие
ipcMain.handle("update-gun", async (_event, id, updateData) => {
    await gunRepository.update(id, updateData);
    return await gunRepository.findOne({ where: { id } });
});

// 📌 Удалить оружие
ipcMain.handle("delete-gun", async (_event, id) => {
    await gunRepository.delete(id);
    return { message: "Оружие удалено" };
});
