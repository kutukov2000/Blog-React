import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { IPostItem } from "./types";
import { apiClient } from "../../utils/api/apiClient";
import { Col, Row, Select, message } from "antd";
import PostCard from "./PostCard";

const sortOptions = ['title', 'postedOn']

const PostListPage = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const categoryName = searchParams.get("categoryName");

    const [posts, setPosts] = useState<IPostItem[]>([]);
    const [sortBy, setSortBy] = useState<string>('postedOn');

    const sortedPosts = sortBy ? [...posts].sort((a, b) => {
        if (sortBy === 'title') {
            return a.title.localeCompare(b.title);
        } else {
            return a.postedOn.localeCompare(b.postedOn);
        }
    }) : posts;

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

    const handleSortBySelect = (value: string) => setSortBy(value);

    return (
        <>
            <h1>{categoryName}</h1>

            <Select
                placeholder="Select a category"
                defaultValue={sortBy}
                onChange={handleSortBySelect}
            >
                {sortOptions.map((option) => (
                    <Select.Option key={option} value={option}>
                        {option}
                    </Select.Option>
                ))}
            </Select>

            <Row gutter={16}>
                <Col span={24}>
                    <Row style={{ display: 'flex', justifyContent: 'center' }}>
                        {sortedPosts.length === 0 ? (
                            <h2>Список пустий</h2>
                        ) : (
                            sortedPosts.map((post) =>
                                <div style={{ width: '80%', margin: 10 }}>
                                    <PostCard key={post.id} item={post} handlePostDelete={handlePostDelete} />
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