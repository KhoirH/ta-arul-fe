'use client';

import React, { useMemo, useState } from 'react';
import {
  AppstoreAddOutlined,
  HistoryOutlined,
  PieChartOutlined,
  LogoutOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Assets', '/dashboard/store-assets', <AppstoreAddOutlined />),
  getItem('History', '/dashboard/history-transaction', <HistoryOutlined />),
  getItem('Employee', '/dashboard/employee', <TeamOutlined />),
];
const Sidenav = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const pathname = usePathname();
  const router = useRouter();
  const listPath = useMemo(() => {
    let listPathname = pathname.split('/');
    listPathname.splice(0,1);
    return listPathname;
  }, [pathname]);
  const listBreadcrubm = useMemo(() => {
    return listPath.map((path,i) => {
      const href = structuredClone(listPath).splice(0,i + 1).join('/');
      return {
        label: path.replace('-', ' '),
        href: pathname != `/${href}` ? `/${href}` : ''
      }
    })
  }, [listPath, pathname])
  
  return (   
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} className="shadow-2xl">
        <div className={`demo-logo-vertical ${collapsed ? 'h-fit w-full' : 'h-24'} bg-white overflow-hidden`} >
          <img src='/logo.jpg' className={`${collapsed ? "w-full" : "h-full m-auto"}`} />
        </div>
        <Menu theme="dark" onClick={(e) => {
          router.push(e.key);
        }} defaultSelectedKeys={[pathname]} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            background: colorBgContainer,
          }}
          className="shadow-md flex !pl-5 pr-10"
        >
          <div className='flex flex-col h-full justify-center'>  
            <h4 className="font-medium leading-snug" style={{ fontSize: '1.2em'}}>
              Asset Transaction Management
            </h4>
            <h4 className="leading-tight">
              PT. Toyota-Astra Motor, Service Parts Logistic Division
            </h4>
          
          </div>
          <div className="ml-auto">
            
            <Button className="!rounded-full" iconPosition={'end'} icon={<LogoutOutlined />} size={'large'}>
              Logout
            </Button>
          </div>
        </Header>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            {
              listBreadcrubm.map((data) => (
                <Breadcrumb.Item className="capitalize cursor-pointer" onClick={(e) => {
                  e.preventDefault()
                  router.push(data.href)
                }} key={data.href}>{data.label}</Breadcrumb.Item>
              ))
            }
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Sidenav;