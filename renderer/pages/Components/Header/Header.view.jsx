import React, { useState } from "react";
import styles from "./Header.module.scss";
import { Button, Layout, Menu } from "antd";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  TableOutlined,
} from "@ant-design/icons";
import TablesContent from "./TablesContent/TablesContent";

const HeaderView = () => {
  const { Header, Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const title = collapsed ? "LB" : "LaserBullet";

  return (
    <div className={styles.wrapper}>
      <Layout className={styles.wrapper__container}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className={styles.logo}> {title} </div>

          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <TableOutlined />,
                label: "Таблицы",
              },
              {
                key: "2",
                icon: <PieChartOutlined />,
                label: "Статистика",
              },
              {
                key: "3",
                icon: <LogoutOutlined />,
                label: "Выход",
              },
            ]}
          />
        </Sider>

        <Layout>
          <Header className={styles.header}>
            <Button
              type="ghost"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className={styles.collapse__button}
            />
          </Header>

          <TablesContent />
        </Layout>
      </Layout>
    </div>
  );
};

export default HeaderView;
