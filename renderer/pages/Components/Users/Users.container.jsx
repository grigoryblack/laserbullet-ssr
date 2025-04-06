import React, { useEffect, useState } from "react";
import UsersView from "./Users.view";
import { Popconfirm, notification, Modal, Form, Button } from "antd";
import moment from "moment";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [targets, setTargets] = useState([]);
  const [guns, setGuns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [usersData, targetsData, gunsData] = await Promise.all([
          window.ipc.invoke("get-users"),
          window.ipc.invoke("get-targets"),
          window.ipc.invoke("get-guns"),
        ]);

        setUsers(Array.isArray(usersData) ? usersData : []);
        setTargets(Array.isArray(targetsData) ? targetsData : []);
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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleCreateUser = async () => {
    try {
      const values = await form.validateFields();
      const newUser = {
        name: values.name,
        secondName: values.secondName,
        createdAt: new Date(),
        gun: values.gun || null,
        target: values.target || null,
      };

      const createdUser = await window.ipc.invoke("create-user", newUser);
      setUsers([...users, createdUser]);
      notification.success({ message: "Пользователь успешно создан" });
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error creating user:", error);
      notification.error({ message: "Ошибка при создании пользователя" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await window.ipc.invoke("delete-user", id);
      setUsers(users.filter((user) => user.id !== id));
      notification.success({ message: "Пользователь успешно удален" });
    } catch (error) {
      console.error("Error deleting user:", error);
      notification.error({ message: "Ошибка при удалении пользователя" });
    }
  };

  // Получаем список занятых мишеней
  const getUsedTargets = () => {
    return users.map(user => user.target?.id || user.target).filter(Boolean);
  };

  // Получаем список занятого оружия
  const getUsedGuns = () => {
    return users.map(user => user.gun?.id || user.gun).filter(Boolean);
  };

  const getGunName = (gunId) => {
    if (!gunId) return "Не выбрано";
    const gun = guns.find(g => g.id === gunId);
    return gun ? gun.currentID : "Неизвестно";
  };

  const getTargetName = (targetId) => {
    if (!targetId) return "Не выбрано";
    const target = targets.find(t => t.id === targetId);
    return target ? target.currentID : "Неизвестно";
  };

  const columns = [
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Фамилия",
      dataIndex: "secondName",
      key: "secondName",
    },
    {
      title: "Винтовка",
      dataIndex: "gun",
      key: "gun",
      render: (gun) => getGunName(gun?.id || gun),
    },
    {
      title: "Мишень",
      dataIndex: "target",
      key: "target",
      render: (target) => getTargetName(target?.id || target),
    },
    {
      title: "Дата создания",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD.MM.YYYY HH:mm"),
    },
    {
      title: "Операции",
      key: "operation",
      render: (_, record) => (
          <Popconfirm
              title="Удалить?"
              okText={"ОК"}
              cancelText={"Отмена"}
              onConfirm={() => handleDelete(record.id)}
          >
            <a style={{ color: 'red' }}>Удалить</a>
          </Popconfirm>
      ),
    },
  ];

  return (
      <UsersView
          users={users}
          columns={columns}
          showModal={showModal}
          isModalVisible={isModalVisible}
          handleCancel={handleCancel}
          handleCreateUser={handleCreateUser}
          loading={loading}
          form={form}
          targets={targets}
          guns={guns}
          usedTargets={getUsedTargets()}
          usedGuns={getUsedGuns()}
      />
  );
};

export default Users;