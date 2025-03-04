import React, { useEffect, useState } from "react";
import UsersView from "./Users.view";
import { Popconfirm, Input } from "antd";
import styles from "../../Ui/Table/Table.module.scss";
import moment from "moment";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await window.ipc.invoke("get-users");
        console.log("usersData", usersData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSave = async (updatedRecord) => {
    const { id, ...updatedValues } = updatedRecord;

    if (!updatedValues || Object.keys(updatedValues).length === 0) {
      console.warn("Нет изменений для сохранения");
      return;
    }

    try {
      await window.ipc.invoke("update-user", id, updatedValues);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, ...updatedValues } : user,
        ),
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleCreateUser = async () => {
    try {
      const newUser = {
        name: "Новый",
        secondName: "Пользователь",
        createdAt: new Date(),
      };
      const createdUser = await window.ipc.invoke("create-user", newUser);
      setUsers([...users, createdUser]);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await window.ipc.invoke("delete-user", id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const columns = [
    {
      title: "Имя",
      dataIndex: "name",
      editable: true,
    },
    {
      title: "Фамилия",
      dataIndex: "secondName",
      editable: true,
    },
    {
      title: "Дата создания",
      dataIndex: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD.MM.YYYY HH:mm"),
    },
    {
      title: "Удален",
      dataIndex: "deletedAt",
      render: (deletedAt) =>
        deletedAt ? moment(deletedAt).format("DD.MM.YYYY HH:mm") : "Не удален",
    },
    {
      title: "Операции",
      dataIndex: "operation",
      render: (_, record) => (
        <Popconfirm
          title="Удалить?"
          okText={"ОК"}
          cancelText={"Отмена"}
          onConfirm={() => handleDelete(record.id)}
        >
          <a className={styles.delete__button}>Удалить</a>
        </Popconfirm>
      ),
    },
  ];

  return (
    <UsersView
      users={users}
      setUsers={setUsers}
      columns={columns}
      handleSave={handleSave}
      handleCreateUser={handleCreateUser}
    />
  );
};

export default Users;
