import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content } = Layout;
import { IProduct } from '../../types/product'
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AppstoreOutlined, DingtalkOutlined,DeploymentUnitOutlined,UserOutlined  } from '@ant-design/icons';
import type { MenuProps } from 'antd';

interface IProps {
    onAdd: (product: IProduct) => void
}
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
            <a href="/admin/products/all" target="_blank" rel="noopener noreferrer">
                Product
            </a>
        ),
        key: 'sy',
        icon: <DingtalkOutlined />,
    },
    {
        label: (
            <a href="/admin/categories/all" target="_blank" rel="noopener noreferrer">
                Category
            </a>
        ),
        key: 'a',
        icon: <DeploymentUnitOutlined  />,
    },
    {
        label: (
            <a href="/products" target="_blank" rel="noopener noreferrer">
                User
            </a>
        ),
        key: 'y',
        icon: <UserOutlined />,
    },
];
const AddProductPage = (props: IProps) => {
    const navigate = useNavigate()
    const {
        token: { colorBgContainer },
    } = theme.useToken()
 
    const [current, setCurrent] = useState('mail');
    const onFinish = (values: any) => {
        props.onAdd(values);
        navigate("/admin/products")
    };
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
      
        
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

                <div className="relative overflow-x-auto">
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
                    label="Product Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Product Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Image"
                    name="image"
                    rules={[{ required: true, message: 'Please input your image' }]}
                >
                    <Input />
                    
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="desc"
                    rules={[{ required: true, message: 'Please input your image' }]}
                >
                    <Input />
                    
                </Form.Item>


                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Add New Product
                    </Button>
                </Form.Item>
            </Form>
                </div>

            </div>
        </Content>
    </Layout>
    </div>
    )
}

export default AddProductPage
