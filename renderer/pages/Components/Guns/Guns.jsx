import React, { useEffect, useState } from "react";
import { Table, notification, Popconfirm, Tag, ConfigProvider } from "antd";
import moment from "moment";
import styles from "./Guns.module.scss"

const Guns = () => {
  const [guns, setGuns] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const gunsData = await window.ipc.invoke("get-guns");
        setGuns(Array.isArray(gunsData) ? gunsData : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        notification.error({ message: "Ошибка при загрузке данных" });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await window.ipc.invoke("delete-gun", id);
      setGuns(guns.filter((gun) => gun.id !== id));
      notification.success({ message: "Винтовка успешно удалена" });
    } catch (error) {
      console.error("Error deleting gun:", error);
      notification.error({ message: "Ошибка при удалении винтовки" });
    }
  };

  const getStatusTag = (status) => {
    let color = "";
    switch (status) {
      case "active":
        color = "green";
        break;
      case "disabled":
        color = "red";
        break;
      default:
        color = "gray";
    }
    return <Tag color={color}>{status}</Tag>;
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "currentID",
      key: "currentID",
    },
    {
      title: "Доступные магазины",
      dataIndex: "availableMagazines",
      key: "availableMagazines",
    },
    {
      title: "Патронов в магазине",
      dataIndex: "bulletsInMagazine",
      key: "bulletsInMagazine",
    },
    {
      title: "Доп. патроны",
      dataIndex: "additionalBullets",
      key: "additionalBullets",
    },
    {
      title: "Статус",
      dataIndex: "gunStatus",
      key: "gunStatus",
      render: (status) => getStatusTag(status),
    },
    {
      title: "Дата создания",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD.MM.YYYY HH:mm"),
    },
    {
      title: "Действия",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title="Удалить винтовку?"
          onConfirm={() => handleDelete(record.id)}
          okText="Да"
          cancelText="Нет"
        >
          <a style={{ color: "red" }}>Удалить</a>
        </Popconfirm>
      ),
    },
  ];

  const themeConfig = {
    token: {
      colorPrimary: "#E0282E",
      borderRadius: 2,
      colorBgContainer: "#ffffff",
    },
  };

  return (
    <div className={styles.wrapper}>
      <ConfigProvider theme={themeConfig}>
        <h2>Винтовки</h2>

        <Table
          className={styles.table}
          dataSource={guns}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </ConfigProvider>
    </div>
  );
};

export default Guns;
