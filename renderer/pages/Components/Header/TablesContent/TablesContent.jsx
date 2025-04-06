import React, { useEffect, useState } from "react";
import { Layout, Tabs } from "antd";
import styles from "./TablesContent.module.scss";
import Users from "../../Users/Users.container";
import Guns from "../../Guns/Guns";
import Targets from "../../Targets/Targets"; // Ваш существующий компонент

const TablesContent = () => {
  const { Content } = Layout;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = window.ipc.on("tcp-data", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => unsubscribe();
  }, []);

  const tabItems = [
    {
      key: "users",
      label: "Игроки",
      children: <Users />,
    },
    {
      key: "Guns",
      label: "Винтовки",
      children: <Guns />,
    },
    {
      key: "Targets",
      label: "Мишени",
      children: <Targets />,
    },
  ];

  return (
    <Content className={styles.content__wrapper}>
      <Tabs defaultActiveKey="users" items={tabItems} />

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
