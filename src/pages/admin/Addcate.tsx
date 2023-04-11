import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content } = Layout;
import { IProduct } from '../../types/product'
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AppstoreOutlined, DingtalkOutlined,DeploymentUnitOutlined,UserOutlined  } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { ICate } from '../../types/cate';

interface IProps {
    onAdd: (cate: ICate) => void
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
        key: 'ay',
        icon: <DingtalkOutlined />,
    },
    {
        label: (
            <a href="/admin/categories/all" target="_blank" rel="noopener noreferrer">
                Category
            </a>
        ),
        key: 'y',
        icon: <DeploymentUnitOutlined  />,
    },
    {
        label: (
            <a href="/products" target="_blank" rel="noopener noreferrer">
                User
            </a>
        ),
        key: 'a',
        icon: <UserOutlined />,
    },
];
// interface IFormInput {
//     id: number,
//     name: string,
//     price: number
// }
const AddCatePages = (props: IProps) => {
    const navigate = useNavigate()
    const {
        token: { colorBgContainer },
    } = theme.useToken()
 
    const [current, setCurrent] = useState('mail');
    const onFinish = (values: any) => {
        props.onAdd(values);
        navigate("/admin/categories/all")
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
                    label="Category Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>



                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Add New Cate
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

export default AddCatePages
