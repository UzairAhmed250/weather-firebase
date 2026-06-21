import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button, ConfigProvider, Grid, Layout, Menu } from "antd";
import {
  HomeOutlined,
  InfoCircleOutlined,
  LoginOutlined,
  LogoutOutlined,
  MailOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";

const { Sider, Content, Header } = Layout;

const NAV_ITEMS = [
  { key: "/", icon: <HomeOutlined />, label: "Home" },
  { key: "/aboutus", icon: <InfoCircleOutlined />, label: "About" },
  { key: "/contactus", icon: <MailOutlined />, label: "Contact" },
];

function getSelectedKey(pathname) {
  if (pathname === "/" || pathname === "/home") {
    return "/";
  }
  return pathname;
}

function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.lg;
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    setCollapsed(true);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setCollapsed(true);
  };

  const handleNavClick = ({ key }) => {
    navigate(key);
    setCollapsed(true);
  };

  const siderContent = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-center border-b border-[#555555] px-4 py-5">
        <Link to="/" onClick={() => setCollapsed(true)}>
          <img
            src="/wethr-ai-logo.png"
            alt="Wethr.ai"
            className="h-14 w-auto object-contain"
          />
        </Link>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[getSelectedKey(location.pathname)]}
        items={NAV_ITEMS}
        onClick={handleNavClick}
        className="flex-1 border-none bg-transparent pt-2"
      />

      <div className="border-t border-[#555555] p-4">
        {user ? (
          <Button
            block
            type="primary"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            className="!h-10 !border-[#59bb18] !bg-[#59bb18] font-semibold hover:!opacity-90"
          >
            Sign Out
          </Button>
        ) : (
          <Button
            block
            type="primary"
            icon={<LoginOutlined />}
            onClick={() => {
              navigate("/login");
              setCollapsed(true);
            }}
            className="!h-10 !border-[#59bb18] !bg-[#59bb18] font-semibold hover:!opacity-90"
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: "#59bb18" },
        components: {
          Menu: {
            darkItemBg: "transparent",
            darkSubMenuItemBg: "transparent",
          },
        },
      }}
    >
      <Layout className="min-h-screen bg-[#444444]">
        {isMobile && (
          <>
            <Sider
              theme="dark"
              width={240}
              collapsedWidth={0}
              collapsed={collapsed}
              onCollapse={setCollapsed}
              trigger={null}
              className="!fixed !bottom-0 !left-0 !top-0 !z-50 !bg-[#3a3a3a]"
            >
              {siderContent}
            </Sider>

            {!collapsed && (
              <button
                type="button"
                aria-label="Close menu"
                className="fixed inset-0 z-40 bg-black/50"
                onClick={() => setCollapsed(true)}
              />
            )}
          </>
        )}

        <Layout className="min-h-screen bg-[#444444]">
          {isMobile ? (
            <Header className="!flex !h-16 !items-center !gap-3 !bg-[#444444] !px-4 !leading-none">
              <button
                type="button"
                aria-label="Open menu"
                onClick={() => setCollapsed(false)}
                className="flex h-10 w-10 items-center justify-center rounded-md text-xl text-white hover:bg-[#555555]"
              >
                <MenuOutlined />
              </button>
              <img
                src="/wethr-ai-logo.png"
                alt="Wethr.ai"
                className="h-9 w-auto object-contain"
              />
            </Header>
          ) : (
            <header className="flex min-h-[80px] items-center justify-between bg-[#444444] px-6 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.9)] md:px-10">
              <Link to="/" className="flex shrink-0 items-center">
                <img
                  src="/wethr-ai-logo.png"
                  alt="Wethr.ai"
                  className="h-12 w-auto object-contain md:h-14"
                />
              </Link>
              <nav className="flex items-center gap-6 text-base text-white md:gap-10">
                {NAV_ITEMS.map(({ key, label }) => (
                  <Link key={key} to={key}>
                    <span
                      className={`cursor-pointer whitespace-nowrap rounded-md px-2 py-1 hover:bg-[#E7E7E7] hover:text-black ${
                        getSelectedKey(location.pathname) === key
                          ? "bg-[#59bb18] font-semibold hover:bg-[#59bb18] hover:text-white"
                          : ""
                      }`}
                    >
                      {label}
                    </span>
                  </Link>
                ))}
                {user ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="cursor-pointer whitespace-nowrap rounded-md bg-[#59bb18] px-3 py-1 font-semibold hover:opacity-90"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="cursor-pointer whitespace-nowrap rounded-md bg-[#59bb18] px-3 py-1 font-semibold hover:opacity-90"
                  >
                    Sign In
                  </Link>
                )}
              </nav>
            </header>
          )}

          <Content
            className={`overflow-x-hidden ${
              isMobile ? "min-h-[calc(100vh-64px)]" : "min-h-[calc(100vh-80px)]"
            }`}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default AppLayout;
