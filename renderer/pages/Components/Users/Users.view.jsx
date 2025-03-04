import React from "react";
import EditableTable from "../../Ui/Table/Table";
import { Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import styles from "./Users.module.scss";

const UsersView = ({
  users,
  setUsers,
  columns,
  handleSave,
  handleCreateUser,
}) => {
  return (
    <div className={styles.user__container}>
      <h2>Пользователи</h2>

      <Button type={"primary"} onClick={handleCreateUser}>
        Добавить пользователя <UserAddOutlined />
      </Button>

      <EditableTable
        data={users}
        setData={setUsers}
        columns={columns}
        handleSave={handleSave}
      />
    </div>
  );
};

export default UsersView;
