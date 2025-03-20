import { adminRoutePaths } from '@app/navigation/adminRoutePaths';
import { RootState } from "@app/store";
import { IAuthStore } from "@app/store/auth";
import { Breadcrumb, Image, Layout, Menu } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import styles from "./AdminLayout.module.scss"; // Import the styles

const { Header, Footer, Sider, Content } = Layout;

function AdminLayout() {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const { isLogin } = useSelector<RootState, IAuthStore>((s) => s.auth)

  // Check auth token
  useEffect(() => {
    if (!isLogin) {
    }
  }, []);

  return (
    <Layout className={styles["admin-layout"]}>
      <Sider width={250} className={styles.sider}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Image
            width={50}
            height={50}
            src="/src/assets/images/topLogo.png"
            alt="Top Logo"
            fallback="https://via.placeholder.com/50" // Default image if the source fails
          />
          <h1>Mezon Top Board</h1>
        </div>
        <Menu theme="dark" mode="vertical" defaultSelectedKeys={["/admin"]} selectedKeys={[location.pathname]}>
          {
            adminRoutePaths.map((route) => (
              <Menu.Item key={route.path} icon={route.icon}>
                <NavLink to={route.path}>{route.label}</NavLink>
              </Menu.Item>
            ))
          }
        </Menu>
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <div className={styles.breadcrumbContainer}>
            <Breadcrumb style={{ color: "#fff" }}>
              {
                pathSnippets.map((snippet, index) => {
                  const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
                  return (
                    <Breadcrumb.Item key={url}>
                      <Link to={url}>{snippet.charAt(0).toUpperCase() + snippet.slice(1)}</Link>
                    </Breadcrumb.Item>
                  );
                })
              }
            </Breadcrumb>
          </div>
        </Header>
        <Content className={styles.content}>
          <Outlet />
        </Content>
        <Footer className={styles.footer}>Footer</Footer>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
