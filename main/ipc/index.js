import { ipcMain } from 'electron'
import {createUser, deleteUser, getUserById, getUsers, updateUser} from "./users/user.controller";

ipcMain.handle('get-users', async () => getUsers())
ipcMain.handle('get-user-by-id', async (_, id) => getUserById(id))
ipcMain.handle('create-user', async (_, data) => createUser(data))
ipcMain.handle('update-user', async (_, id, data) => updateUser(id, data))
ipcMain.handle('delete-user', async (_, id) => deleteUser(id))
