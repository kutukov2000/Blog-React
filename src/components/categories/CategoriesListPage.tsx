import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard.tsx";
import { ICategoryItem } from "./types.ts";
import { apiClient } from "../../utils/api/apiClient.ts";

const CategoryListPage = () => {
    const [categories, setCategories] = useState<ICategoryItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get<ICategoryItem[]>('api/categories');
                console.log("response.data", response.data)
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <h1>Categories list</h1>

            <Row gutter={16}>
                <Col span={24}>
                    <Row>
                        {categories.length === 0 ? (
                            <h2>Список пустий</h2>
                        ) : (
                            categories.map((item) =>
                                <CategoryCard key={item.id} item={item} />,
                            )
                        )}
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default CategoryListPage;