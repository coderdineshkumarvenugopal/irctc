import { Layout, ConfigProvider, App as AntApp, theme } from "antd";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ErrorBoundary from "./app/components/ErrorBoundary";
import SideNav from "./app/components/sidenav";
import { BookingProvider } from "./context/BookingContext";
const { Content } = Layout;
function App() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState<boolean>(false);
  return (
    <ErrorBoundary>
       <BookingProvider>
      <ConfigProvider
        theme={{
          algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: "#0052CC",
            borderRadius: 4,
            fontFamily:
              "'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            fontSize: 14,
          },
        }}
      >
        <AntApp>
          <Layout hasSider>
            {!location?.pathname?.includes("login") &&
              !location?.pathname?.includes("sign-in") && (
                <SideNav
                  darkMode={darkMode}
                  toggleDarkMode={() => setDarkMode(!darkMode)}
                />
              )}
            {/* <Header darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} /> */}
            <Layout className="site-layout overflow-auto">
              <Content>
                <Outlet />
              </Content>
            </Layout>
          </Layout>
        </AntApp>
      </ConfigProvider>
      </BookingProvider>
    </ErrorBoundary>
  );
}

export default App;
