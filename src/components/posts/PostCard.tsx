import { Card, Col, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import { IPostItem } from "./types";

const { Title } = Typography;

interface IPostCardProps {
    item: IPostItem
}

const PostCard: React.FC<IPostCardProps> = (props) => {
    const { item } = props;
    const { title, description } = item;


    return (
        <>
            <Col style={{ padding: 10 }} xxl={4} lg={8} md={8} sm={12}>
                <Card
                    bodyStyle={{ flex: '1', paddingBlock: '10px' }}
                    style={{ height: 180, display: 'flex', flexDirection: 'column', paddingTop: '40px' }}
                    hoverable >
                    <Meta
                        title={title}
                        description={
                            <Title level={5} type="success">{description.substring(0, 35)} ...</Title>
                        } />
                </Card>
            </Col>
        </>
    )
}

export default PostCard;