import React from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  Table,
  ConfigProvider,
  Tag,
} from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import styles from "./Users.module.scss";

const themeConfig = {
  token: {
    colorPrimary: "#E0282E",
    borderRadius: 2,
    colorBgContainer: "#ffffff",
  },
};

const UsersView = ({
  users,
  columns,
  showModal,
  isModalVisible,
  handleCancel,
  handleCreateUser,
  loading,
  form,
  targets,
  guns,
  usedTargets,
  usedGuns,
}) => {
  return (
    <div className={styles.user__container}>
      <h2>Пользователи</h2>

      <Button type="primary" onClick={showModal} icon={<UserAddOutlined />}>
        Добавить игрока
      </Button>

      <ConfigProvider theme={themeConfig}>
        <Table
          className={styles.table}
          dataSource={users}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={false}
        />

        <Modal
          title="Добавить нового игрока"
          open={isModalVisible}
          onOk={handleCreateUser}
          onCancel={handleCancel}
          okText="Сохранить"
          cancelText="Отмена"
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Имя"
              rules={[{ required: true, message: "Пожалуйста, введите имя" }]}
            >
              <Input placeholder="Введите имя" />
            </Form.Item>
            <Form.Item
              name="secondName"
              label="Фамилия"
              rules={[
                { required: true, message: "Пожалуйста, введите фамилию" },
              ]}
            >
              <Input placeholder="Введите фамилию" />
            </Form.Item>
            <Form.Item name="gun" label="Винтовка" rules={[{ required: true, message: "Пожалуйста, выберите винтовку" }]}>
              <Select placeholder="Выберите винтовку">
                <Select.Option value={null}>Не выбрано</Select.Option>
                {guns.map((gun) => (
                  <Select.Option
                    key={gun.id}
                    value={gun.id}
                    disabled={usedGuns.includes(gun.id)}
                  >
                    {gun.currentID}
                    {usedGuns.includes(gun.id) && (
                      <Tag color="red" style={{ marginLeft: 8 }}>
                        Занято
                      </Tag>
                    )}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="target" label="Мишень" rules={[{ required: true, message: "Пожалуйста, выберите мишень"}]}>
              <Select placeholder="Выберите мишень">
                <Select.Option value={null}>Не выбрано</Select.Option>
                {targets.map((target) => (
                  <Select.Option
                    key={target.id}
                    value={target.id}
                    disabled={usedTargets.includes(target.id)}
                  >
                    {target.currentID}
                    {usedTargets.includes(target.id) && (
                      <Tag color="red" style={{ marginLeft: 8 }}>
                        Занято
                      </Tag>
                    )}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default UsersView;
