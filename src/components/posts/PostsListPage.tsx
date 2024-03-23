import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { IPostItem } from "./types";
import { apiClient } from "../../utils/api/apiClient";
import { Button, Col, Row, message } from "antd";
import PostCard from "./PostCard";
import { useAppSelector } from "../../hooks/redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const PostListPage = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const categoryName = searchParams.get("categoryName");

    const [posts, setPosts] = useState<IPostItem[]>([]);

    const { isLogin } = useAppSelector(state => state.account);

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

    const handlePostDelete = async (postId: number) => {
        try {
            await apiClient.delete(`api/posts/${postId}`);
            setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
            message.success(`Post successfully deleted!`)
        } catch (error) {
            console.error('Error deleting post:', error);
            message.error(`Post deleting error!`)
        }
    }

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
                                <div style={{ width: '100%', margin: 10 }}>
                                    <Link to={`../post/${post.id}/${post.urlSlug}`} style={{ width: '40%', margin: 10 }}>
                                        <PostCard key={post.id} item={post} />
                                    </Link>
                                    {isLogin && (
                                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Link to={`../post/edit/${post.id}`}>
                                                <Button
                                                    icon={<EditOutlined />}
                                                    style={{ borderColor: 'orange', color: 'orange' }}>
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Button
                                                onClick={() => handlePostDelete(post.id)}
                                                icon={<DeleteOutlined />}
                                                danger>Delete</Button>
                                        </div>
                                    )}
                                </div>
                            )
                        )}
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default PostListPage;