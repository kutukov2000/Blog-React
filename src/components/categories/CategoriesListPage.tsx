import { Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard.tsx";
import { ICategoryItem } from "./types.ts";
import { apiClient } from "../../utils/api/apiClient.ts";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux/index.ts";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const CategoryListPage = () => {
    const [categories, setCategories] = useState<ICategoryItem[]>([]);

    const { isAdmin } = useAppSelector(state => state.account);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get<ICategoryItem[]>('api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchData();
    }, []);

    const handleCategoryDelete = async (categoryId: number) => {
        try {
            await apiClient.delete(`api/categories/${categoryId}`);
            setCategories(prevCategories => prevCategories.filter(category => category.id !== categoryId));
        } catch (error) {
            console.error('Error deleting categories:', error);
        }
    }

    return (
        <>
            <h1>Categories list</h1>

            <Row gutter={16}>
                <Col span={24}>
                    <Row>
                        {categories.length === 0 ? (
                            <h2>Список пустий</h2>
                        ) : (
                            categories.map((category) =>
                                <div style={{ width: '40%', margin: 10 }}>
                                    <Link to={`category/${category.id}/${category.urlSlug}?categoryName=${category.name}`}>
                                        <CategoryCard key={category.id} item={category} />
                                    </Link>
                                    {isAdmin ?
                                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Link to={`category/edit/${category.id}`}>
                                                <Button
                                                    icon={<EditOutlined />}
                                                    style={{ borderColor: 'orange', color: 'orange' }}>
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Button
                                                onClick={() => handleCategoryDelete(category.id)}
                                                icon={<DeleteOutlined />}
                                                danger>Delete</Button>
                                        </div>
                                        : <></>}
                                </div>
                            )
                        )}
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default CategoryListPage;