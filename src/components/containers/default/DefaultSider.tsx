import { Layout, Menu, theme } from "antd";
import { PlusCircleOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";

const { Sider } = Layout;

const DefaultSider = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const { isAdmin } = useAppSelector(state => state.account);
    console.log("isAdmin: ", isAdmin)

    const menuItems = [{
        key: '1',
        icon: <UnorderedListOutlined />,
        label: <Link to={'/'}>Categories List</Link>
    }];

    if (isAdmin) {
        menuItems.push({
            key: '2',
            icon: <PlusCircleOutlined />,
            label: <Link to={'/category/create'}>Create category</Link>
        });
    }

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
