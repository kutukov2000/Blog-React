import { Card, Col, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import { ICategoryItem } from "./types";

const { Title } = Typography;

interface ICategoryCardProps {
    item: ICategoryItem
}

const CategoryCard: React.FC<ICategoryCardProps> = (props) => {
    const { item } = props;
    const { name, description } = item;


    return (
        <>
            <Col style={{ padding: 10 }} xxl={4} lg={8} md={8} sm={12}>
                <Card
                    bodyStyle={{ flex: '1', paddingBlock: '10px' }}
                    style={{ height: 180, display: 'flex', flexDirection: 'column', paddingTop: '40px' }}
                    hoverable >
                    <Meta
                        title={name}
                        description={
                            <Title level={5} type="success">{description.substring(0, 35)} ...</Title>
                        } />
                </Card>
            </Col>
        </>
    )
}

export default CategoryCard;