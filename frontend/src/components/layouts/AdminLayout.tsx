import { Layout, Menu } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { adminRoutePaths } from '@app/navigation/adminRoutePaths';
import styles from "./AdminLayout.module.css"; // Import the styles

const { Header, Footer, Sider, Content } = Layout;

function AdminLayout() {
  return (
    <Layout className={styles["admin-layout"]}>
      <Sider width={250} className={styles.sider}>
      <Menu theme="dark" mode="vertical" defaultSelectedKeys={["/admin"]}>
          {adminRoutePaths.map((route) => (
            <Menu.Item key={route.path}>
              <NavLink to={`/admin/${route.path}`}>{route.label}</NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header className={styles.header}>Header</Header>
        <Content className={styles.content}>
          <Outlet />
        </Content>
        <Footer className={styles.footer}>Footer</Footer>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
