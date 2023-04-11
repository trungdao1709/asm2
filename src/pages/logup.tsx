import React, { useEffect, useState } from 'react'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer } = Layout;
import { Col, Row } from 'antd';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom'
import { AppstoreOutlined, DingtalkOutlined, DeploymentUnitOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { IUser } from '../types/user';

const items: MenuProps['items'] = [
  {
    label: (
      <a href="/" target="_blank" rel="noopener noreferrer">
        Home
      </a>
    ),
    key: 'SubMenu',
    icon: <AppstoreOutlined />,
  },
  {
    label: (
      <a href="/logup" target="_blank" rel="noopener noreferrer">
        Log up
      </a>
    ),
    key: 'app',
    icon: <DeploymentUnitOutlined />,
  },
  {
    label: (
      <a href="/login" target="_blank" rel="noopener noreferrer">
        Log in
      </a>
    ),
    key: 'login',
    icon: <UserOutlined />,
  },
];

const { Meta } = Card;

interface IProps {
  users: IUser[],
  onUpdate: (user: IUser) => void
}



const LogupPage = (props: IProps) => {

  const onFinish = (values: any) => {

    console.log(values);

    props.onUpdate(values);
    navigate(`/login`)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const navigate = useNavigate()
  const navi = (id: Number) => {
    navigate(`/login`)
  }
  const [data, setData] = useState<IUser[]>([])
  useEffect(() => {
    setData(props.users)
  }, [props])
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content" style={{ background: colorBgContainer }}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="name"
              rules={[{ 
                required: true,
                message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, 
                type: 'email',  
                message: 'Please input your Email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="ConFirmPassword"
              name="confirmPassword"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

{/* 
            <Form.Item
              label="Role"
              name="role"
              style={{ display: 'none' }}
              initialValue="member"
              wrapperCol={{ offset: 8, span: 16 }}>

              <Input />
            </Form.Item> */}


            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  )
}

export default LogupPage