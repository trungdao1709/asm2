import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content } = Layout;
import { AppstoreOutlined, DingtalkOutlined,DeploymentUnitOutlined,UserOutlined  } from '@ant-design/icons';
import { IProduct } from '../../types/product'
import { Button, Form, Input } from 'antd';
import type { MenuProps } from 'antd';
interface IProps {
    products: IProduct[],
    onUpdate: (product: IProduct) => void
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
        key: 'alipay',
        icon: <DingtalkOutlined />,
    },
    {
        label: (
            <a href="/admin/categories/all" target="_blank" rel="noopener noreferrer">
                Category
            </a>
        ),
        key: 'alipay',
        icon: <DeploymentUnitOutlined  />,
    },
    {
        label: (
            <a href="/products" target="_blank" rel="noopener noreferrer">
                User
            </a>
        ),
        key: 'alipay',
        icon: <UserOutlined />,
    },
];
const UpdateProductPage = (props: IProps) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken()
 
    const [current, setCurrent] = useState('mail');
    const { id } = useParams()
    const navigate = useNavigate() 
    const [product, setProduct] = useState<IProduct>()
    useEffect(() => { 
        const currentProduct = props.products.find((product: IProduct) => product.id == Number(id))
        setProduct(currentProduct) 
    }, [props])
    useEffect(() => {
        setFields()
    }, [product])
    const [form] = Form.useForm();
    
    const setFields = () => {
        form.setFieldsValue({ 
            id: product?.id,
            name: product?.name,
            price: product?.price,
            desc: product?.desc,
            image: product?.image
        })
    }

    const onFinish = (values: any) => {
        props.onUpdate(values);
        navigate('/admin/products')
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
                form={form}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
            >
                <Form.Item
                    label=""
                    name="id"
                    style={{ display: 'none' }} // ẩn input này đi
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Product Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input your price!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Image"
                    name="image"
                    rules={[{ required: true, message: 'Please input your image!' }]}
                >
                    <Input />
                </Form.Item>



                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Update Product
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

export default UpdateProductPage