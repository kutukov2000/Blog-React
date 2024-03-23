import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { IPostItem } from "./types";
import { apiClient } from "../../utils/api/apiClient";
import { Col, Row } from "antd";
import PostCard from "./PostCard";

const PostListPage = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const categoryName = searchParams.get("categoryName");

    const [posts, setPosts] = useState<IPostItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get<IPostItem[]>(`/api/posts/byCategoryId/${id}`);
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <h1>{categoryName}</h1>

            <Row gutter={16}>
                <Col span={24}>
                    <Row>
                        {posts.length === 0 ? (
                            <h2>Список пустий</h2>
                        ) : (
                            posts.map((post) =>
                                <Link to={`../post/${post.id}/${post.urlSlug}`} style={{ width: '40%', margin: 10 }}>
                                    <PostCard key={post.id} item={post} />
                                </Link>
                            )
                        )}
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default PostListPage;