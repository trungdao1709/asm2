import React, { useEffect, useState } from 'react'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content } = Layout;
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom'
import { AppstoreOutlined, DingtalkOutlined, DeploymentUnitOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import axios from "axios";
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);



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
        key: 'y',
        icon: <DingtalkOutlined />,
    },
    {
        label: (
            <a href="/admin/categories/all" target="_blank" rel="noopener noreferrer">
                Category
            </a>
        ),
        key: 'ay',
        icon: <DeploymentUnitOutlined />,
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
    onRemove: (id: number) => void
}



const Dashboard = (props: IProps) => {
    const onSearch = (value: string) => console.log(value);
    const [current, setCurrent] = useState('mail');
    useEffect(() => {
        setData(props.products)
    }, [props])

    function removeProduct(id: number) {
        const err = window.confirm(`Are you sure you want to remove`)
        if (err) {
            props.onRemove(id)
        }


    }

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const navigate = useNavigate()
    const navi = (id: Number) => {
        navigate(`/admin/products/${id}/up`)
    }
    const naviadd = () => {
        navigate(`/admin/products/add`)
    }
    const [data, setData] = useState<IProduct[]>([])
    useEffect(() => {
        setData(props.products)
    }, [props])
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/products/admin/products/all?q=${searchTerm}`);
            setSearchResult(response.data);
        } catch (error) {
            console.error(error);
        }
    };
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
                <Search
                    placeholder="input search text"
                    enterButton="Search"
                    size="large"
                    suffix={suffix}
                    onSearch={onSearch}
                />
                <div className="site-layout-content" style={{ background: colorBgContainer }}>
                    <button className="border px-8 py-2" onClick={() => naviadd()}>Add</button>

                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Product name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Desc
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Image
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(item => {
                                    return (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item.id}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {item.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {item.price}
                                            </td>
                                            <td className="px-6 py-4">
                                                <img src={item.image} alt="" />
                                            </td>
                                            <td className="px-6 py-4">
                                                <button className="border px-8 py-2" onClick={() => removeProduct(item.id)}>Xoa</button>
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


export default Dashboard