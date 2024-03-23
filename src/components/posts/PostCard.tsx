import { Button, Card, Col, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import { IPostItem } from "./types";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Title } = Typography;

interface IPostCardProps {
    item: IPostItem,
    handlePostDelete: (postId: number) => Promise<void>
}

const PostCard: React.FC<IPostCardProps> = (props) => {
    const { item, handlePostDelete } = props;
    const { id, urlSlug, title, description } = item;

    const { isLogin } = useAppSelector(state => state.account);

    return (
        <>
            <Col className="card" style={{ padding: 10 }} xxl={4} lg={8} md={8} sm={12}>
                <Card
                    bodyStyle={{ flex: '1', paddingBlock: '10px' }}
                    style={{ height: 225, display: 'flex', flexDirection: 'column', paddingTop: '35px' }}
                    hoverable >
                    <Meta
                        title={title}
                        description={
                            <Title level={5} type="success">{description.substring(0, 150)} ...</Title>
                        } />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 5, paddingTop: '10px' }}>
                        {isLogin && (
                            <>
                                <Link to={`../post/edit/${id}`}>
                                    <Button
                                        icon={<EditOutlined />}
                                        style={{ borderColor: 'orange', color: 'orange' }}>
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    onClick={() => handlePostDelete(id)}
                                    icon={<DeleteOutlined />}
                                    danger>
                                    Delete
                                </Button>
                            </>
                        )}
                        <Link to={`../post/${id}/${urlSlug}`}>
                            <Button>Read more</Button>
                        </Link>
                    </div>
                </Card>
            </Col>
        </>
    )
}

export default PostCard;