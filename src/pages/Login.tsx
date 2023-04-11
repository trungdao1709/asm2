import React, { useEffect, useState } from 'react'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer } = Layout;
import { Col, Row } from 'antd';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom'
import { AppstoreOutlined, DingtalkOutlined, DeploymentUnitOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';

const items: MenuProps['items'] = [
    {
        label: (
            <a href="/" target="_blank" rel="noopener noreferrer">
                Home
            </a>
        ),
        key: 'mail',
        icon: <AppstoreOutlined />,
    },
    {
        label: (
            <a href="/logup" target="_blank" rel="noopener noreferrer">
                Log up
            </a>
        ),
        key: 'logup',
        icon: <DeploymentUnitOutlined />,
    },
    {
        label: (
            <a href="/login" target="_blank" rel="noopener noreferrer">
                Log in
            </a>
        ),
        key: 'alipay',
        icon: <UserOutlined />,
    },
];

const { Meta } = Card;
interface IProduct {
    id: number,
    name: string,
    price: number,
    image: string,
    desc: string,
}
interface IProps {
    products: IProduct[],
}



const LoginPage = (props: IProps) => {
    const navigate = useNavigate()
    const onFinish = (values: any) => {
        alert("Ban dang nhap thanh cong")
        console.log('Success:', values);
        navigate(`/admin/products/all`)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);

    };
    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };


    const navi = (id: Number) => {
        navigate(`/admin/products`)
    }
    const [data, setData] = useState<IProduct[]>([])
    useEffect(() => {
        setData(props.products)
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
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
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

                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

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

export default LoginPage
