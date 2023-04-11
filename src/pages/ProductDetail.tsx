import React, { useEffect, useState } from 'react'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer } = Layout;
import { Col, Row } from 'antd';
import { Card } from 'antd';
import { useNavigate, useParams } from 'react-router-dom'
import { AppstoreOutlined, DingtalkOutlined,DeploymentUnitOutlined,UserOutlined,MailOutlined  } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { IProduct } from '../types/product';
const items: MenuProps['items'] = [
    {
        label: (
            <a href="/" target="_blank" rel="noopener noreferrer">
              Home
            </a>
          ),
      key: 'mail',
      icon: <AppstoreOutlined/>,
    },
    {
      label: (
        <a href="/admin/products/all" target="_blank" rel="noopener noreferrer">
          Amin
        </a>
      ),
      key: 'pay',
      icon: <MailOutlined />,
    },
    {
        label: (
            <a href="/logup" target="_blank" rel="noopener noreferrer">
                Log up
            </a>
        ),
        key: 'app',
        icon: <DeploymentUnitOutlined  />,
    },
    {
        label: (
            <a href="/login" target="_blank" rel="noopener noreferrer">
                Log in
            </a>
        ),
        key: 'y',
        icon: <UserOutlined />,
    },
  ];


const ProductDetailPage = (props: { products: any[] }) => {
    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = (e) => {
      console.log('click ', e);
      setCurrent(e.key);
    };
    const { id } = useParams()
    const [product, setProduct] = useState<IProduct>()
    useEffect(() => {
        const currentProduct = props.products.find((item: { id: number }) => item.id === Number(id))
        setProduct(currentProduct)
    })
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { Meta } = Card;
    return (
        // <div>
        //     <h3>{product?.name}</h3>
        //     <p>{product?.price}</p>
        // </div>
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
                <Row  >
               
                           
                            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }} key={product?.id}>
                                <Card
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={<img alt="example" src={product?.image} />}
                                >
                                    <Meta title={product?.price} description={product?.desc} />
                                </Card>
                            </Col>
                        
                   
                    </Row> 

                    
                </div>
            </Content>
        </Layout>
    )
}

export default ProductDetailPage