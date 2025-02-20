import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {

    const [messages, setMessages] = useState([])

    useEffect(() => {
        const unsubscribe = window.ipc.on('tcp-data', (data) => {
            setMessages((prev) => [...prev, data])
        })

        return () => unsubscribe()
    }, [])

    const handleGetData = async () => {
        try {
            const users = await window.ipc.invoke('get-users')
            const guns = await window.ipc.invoke('get-guns')
            const targets = await window.ipc.invoke('get-targets')

            console.log(users, guns, targets)
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

  return (
      <React.Fragment>
          <Head>
              <title>Home - Nextron (basic-lang-javascript)</title>
          </Head>
          <div>
              <p>
                  ⚡ Electron + Next.js ⚡ - <Link href="/next">Go to next page</Link>
              </p>
              <Image
                  src="/images/logo.png"
                  alt="Logo image"
                  width={256}
                  height={256}
              />
          </div>

          <h1>TCP Сервер Логи</h1>
          <ul>
              {messages.map((msg, index) => (
                  <li key={index}>
                      <strong>{msg.from}:</strong> {msg.message}
                  </li>
              ))}
          </ul>

          <div>
              <button onClick={handleGetData}>
                  Test IPC
              </button>
          </div>
      </React.Fragment>
  )
}
