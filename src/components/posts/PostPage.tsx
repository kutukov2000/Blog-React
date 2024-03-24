import { Row, Col, message, Tag, Flex } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiClient } from "../../utils/api/apiClient";
import { IPostItem } from "./types";

const PostPage = () => {
    const { id } = useParams();

    const [post, setPost] = useState<IPostItem | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get<IPostItem>(`/api/posts/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error('Post fetching error: ', error);
                message.error('Post fetching error!');
            }
        };

        fetchData();
    }, []);

    const formatDate = (dateString: string | undefined) => dateString?.replace('T', ' ').replace(/\.\d+/, '');

    return (
        <Row gutter={16}>
            <Col span={24}>
                <h1>{post?.title}</h1>
                <p className="date">Posted: {formatDate(post?.postedOn)}</p>
                <p className="date">Edited: {formatDate(post?.modified)}</p>

                <p>{post?.description}</p>

                <hr />
                <Flex gap="4px 0" wrap="wrap">
                    {post?.tags.map((tag) => (
                        <Tag color="magenta">#{tag}</Tag>
                    ))}
                </Flex>
            </Col>
        </Row>
    );
}

export default PostPage;