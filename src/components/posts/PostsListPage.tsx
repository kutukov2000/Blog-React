import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IPostItem } from "./types";
import { apiClient } from "../../utils/api/apiClient";
import { Col, Row } from "antd";
import PostCard from "./PostCard";

const PostListPage = () => {
    const { id } = useParams();

    const [posts, setPosts] = useState<IPostItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get<IPostItem[]>(`/api/posts/${id}`);
                console.log("response.data", response.data)
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <h1>postListPage {id}</h1>

            <Row gutter={16}>
                <Col span={24}>
                    <Row>
                        {posts.length === 0 ? (
                            <h2>Список пустий</h2>
                        ) : (
                            posts.map((post) =>
                                <PostCard key={post.id} item={post} />
                            )
                        )}
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default PostListPage;