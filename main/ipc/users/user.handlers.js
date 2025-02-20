import { ipcMain } from "electron"
import {AppDataSource} from "../../database/config";
import {User} from "../../database/entities/user";


const userRepository = AppDataSource.getRepository(User)

// 📌 Получить всех пользователей
ipcMain.handle("get-users", async () => {
    return await userRepository.find({ relations: ["gun", "target"] })
})

// 📌 Получить одного пользователя по ID
ipcMain.handle("get-user", async (_event, id) => {
    return await userRepository.findOne({ where: { id }, relations: ["gun", "target"] })
})

// 📌 Создать нового пользователя
ipcMain.handle("create-user", async (_event, userData) => {
    const newUser = userRepository.create(userData)
    return await userRepository.save(newUser)
})

// 📌 Обновить пользователя
ipcMain.handle("update-user", async (_event, id, updateData) => {
    await userRepository.update(id, updateData)
    return await userRepository.findOne({ where: { id } })
})

// 📌 Удалить пользователя
ipcMain.handle("delete-user", async (_event, id) => {
    await userRepository.delete(id)
    return { message: "Пользователь удалён" }
})
