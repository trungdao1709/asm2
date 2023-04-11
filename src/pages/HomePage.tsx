import React, { useEffect, useState } from 'react'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer } = Layout;
import { Col, Row } from 'antd';
import { Card } from 'antd';
import { useNavigate,useParams } from 'react-router-dom'
import { AppstoreOutlined, DingtalkOutlined,DeploymentUnitOutlined,UserOutlined,MailOutlined  } from '@ant-design/icons';
import type { MenuProps } from 'antd';
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
      key: 'Submail',
      icon: <MailOutlined />,
    },
    {
        label: (
            <a href="/logup" target="_blank" rel="noopener noreferrer">
                Log up
            </a>
        ),
        key: 'alipay',
        icon: <DeploymentUnitOutlined  />,
    },
    {
        label: (
            <a href="/login" target="_blank" rel="noopener noreferrer">
                Log in
            </a>
        ),
        key: 'app',
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



const HomePage = (props:IProps) => {
    const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

    const navigate = useNavigate()
    const navi = (id:Number) => {
        navigate(`/products/${id}`)
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
                <Row  >
                {data.map(item => {
                        return (
                           
                            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }} onClick={() => navi(item.id)} key={item.id}>
                                <Card
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={<img alt="example" src={item.image} />}
                                >
                                    <Meta title={item.price} description={item.desc} />
                                </Card>
                            </Col>
                        
                        )
                    })}
                    </Row> 

                    
                </div>
            </Content>
        </Layout>
    )
}

export default HomePage