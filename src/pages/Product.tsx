import React, { useEffect, useState } from 'react'
interface IProduct {
    id: number,
    name: string,
    price: number
}
interface IProps {
    products: IProduct[],
    onRemove: (id: number) => void
}

const ProductPage = (props: IProps) => {
    const [data, setData] = useState<IProduct[]>([])
    useEffect(() => {
        setData(props.products)
    }, [props])

    function removeProduct(id: number) {
        const err = window.confirm(`Are you sure you want to remove`)
        if(err){
            props.onRemove(id)
        }
        
       
    }
    return (
        <div>

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
                                {item.price}
                                </td>
                                <td className="px-6 py-4">
                                    <button className="border px-8 py-2"  onClick={() => removeProduct(item.id)}>Xoa</button>
                                    {/* <button className="border px-8 py-2" onClick={() => navi(item.id)}>Update</button> */}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>


    </div>
    )
}

export default ProductPage