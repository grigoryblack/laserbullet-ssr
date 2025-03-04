import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import styles from "./TablesContent.module.scss";
import Users from "../../Users/Users.container";

const TablesContent = () => {
  const { Content } = Layout;

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = window.ipc.on("tcp-data", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Content className={styles.content__wrapper}>

      <Users />

      <h3>TCP Connect</h3>

      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.from}:</strong> {msg.message}
          </div>
        ))}
      </div>
    </Content>
  );
};

export default TablesContent;
