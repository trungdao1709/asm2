import React, { useEffect, useState } from 'react'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content } = Layout;
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom'
import { AppstoreOutlined, DingtalkOutlined,DeploymentUnitOutlined,UserOutlined  } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { ICate } from '../../types/cate';
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
            <a href="/products" target="_blank" rel="noopener noreferrer">
                Product
            </a>
        ),
        key: 'products',
        icon: <DingtalkOutlined />,
    },
    {
        label: (
            <a href="/categories" target="_blank" rel="noopener noreferrer">
                Category
            </a>
        ),
        key: 'category',
        icon: <DeploymentUnitOutlined  />,
    },
    {
        label: (
            <a href="/products" target="_blank" rel="noopener noreferrer">
                User
            </a>
        ),
        key: 'user',
        icon: <UserOutlined />,
    },
];

const { Meta } = Card;
interface IProps {
    Cate: ICate[],
    onRemove: (id: number) => void
}



const Category = (props: IProps) => {
    const [current, setCurrent] = useState('mail');
    useEffect(() => {
        setData(props.Cate)
    }, [props])

    function removeCate(id: number) {
        const err = window.confirm(`Are you sure you want to remove`)
        if(err){
            
            props.onRemove(id)
        }
        
       
    }

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const navigate = useNavigate()
    const navi = (id: Number) => {
        navigate(`/admin/categories/${id}/up`)
    }
    const naviAdd = () => {
        navigate(`/admin/categories/add`)
    }
    const [data, setData] = useState<ICate[]>([])
    useEffect(() => {
        setData(props.Cate)
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
                <button className="border px-8 py-2" onClick={() => naviAdd()}>Add</button>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Category name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(item => {
                                    return (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item.id}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
                                                {item.name}
                                            </th>
                                            <td className="px-6 py-4" >
                                                <button className="border px-8 py-2" onClick={() => removeCate(item.id)}>Xoa</button>
                                                <button className="border px-8 py-2" onClick={() => navi(item.id)}>Update</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>
            </Content>
        </Layout>
    )
}

export default Category