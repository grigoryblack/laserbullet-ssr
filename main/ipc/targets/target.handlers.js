import { ipcMain } from "electron";
import { AppDataSource } from "../../database/config";
import { Target } from "../../database/entities/target";

const targetRepository = AppDataSource.getRepository(Target);

// 📌 Получить все мишени
ipcMain.handle("get-targets", async () => {
    return await targetRepository.find({ relations: ["user"] });
});

// 📌 Получить одну мишень по ID
ipcMain.handle("get-target", async (_event, id) => {
    return await targetRepository.findOne({ where: { id }, relations: ["user"] });
});

// 📌 Создать новую мишень
ipcMain.handle("create-target", async (_event, targetData) => {
    const newTarget = targetRepository.create(targetData);
    return await targetRepository.save(newTarget);
});

// 📌 Обновить мишень
ipcMain.handle("update-target", async (_event, id, updateData) => {
    await targetRepository.update(id, updateData);
    return await targetRepository.findOne({ where: { id } });
});

// 📌 Удалить мишень
ipcMain.handle("delete-target", async (_event, id) => {
    await targetRepository.delete(id);
    return { message: "Мишень удалена" };
});
