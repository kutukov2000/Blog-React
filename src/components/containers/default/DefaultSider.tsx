import { Layout, Menu, theme } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";

const { Sider } = Layout;

const DefaultSider = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const menuItems = [{
        key: '1',
        icon: <UnorderedListOutlined />,
        label: 'Categories list'
    }];

    return (
        <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['1']}
                style={{ height: '100%' }}
                items={menuItems}
            />
        </Sider>
    )
}

export default DefaultSider;