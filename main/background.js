import path from 'path'
import { app } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import "./ipc/users/user.handlers"
import "./ipc/guns/gun.handlers"
import "./ipc/targets/target.handlers"
import net from 'net'

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }

  // Создаем TCP-сервер
  const tcpServer = net.createServer((socket) => {
    const clientAddress = socket.remoteAddress;  // IP-адрес клиента
    const clientPort = socket.remotePort;        // Порт клиента

    console.log(`New connect: ${clientAddress}:${clientPort}`);

    // Когда клиент отправляет данные, обрабатываем их
    socket.on('data', (data) => {
      console.log(`Get data from: ${clientAddress}:${clientPort}: ${data.toString()}`);

      mainWindow.webContents.send('tcp-data', {
        from: `${clientAddress}:${clientPort}`,
        message: `${data.toString()}`
      })
    });

    // Когда соединение закрывается
    socket.on('end', () => {
      console.log(`Client ${clientAddress}:${clientPort} enabled`);
    });

    // Ошибки
    socket.on('error', (err) => {
      console.error(`Error connect with: ${clientAddress}:${clientPort}:`, err);
    });
  });

  // Настроим TCP-сервер на прослушивание порта (например, 4000)
  const tcpPort = 4000; // Вы можете выбрать любой другой порт
  tcpServer.listen(tcpPort, () => {
    console.log(`TCP-server start on: ${tcpPort}`);
  });

})()

app.on('window-all-closed', () => {
  app.quit()
})
