import { Button, Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { UserOutlined, PoweroffOutlined, UserAddOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import ButtonGroup from "antd/es/button/button-group";
import { logout } from "../../../store/accounts/accounts.slice.ts";
import { BackButton } from '../../featured/BackButton.tsx';

const { Header } = Layout;

const DefaultHeader = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const { isLogin, user } = useAppSelector(state => state.account);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <Header style={{ display: 'flex', alignItems: 'center' }}>
            <div className="demo-logo" />
            <BackButton />

            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[location.pathname.substr(1)]} // Highlight the selected menu item
                style={{ flex: 1, minWidth: 0 }}
            >
                <Menu.Item key={"categories"}>
                    <Link to={`/`}>Categories</Link>
                </Menu.Item>
            </Menu>

            {isLogin ? (
                <ButtonGroup size="large">
                    <Button
                        type="primary"
                        style={{ display: 'flex' }}
                    >
                        {user?.name}
                    </Button>
                    <Button
                        type="primary"
                        icon={<PoweroffOutlined />}
                        onClick={() => handleLogout()}
                    />
                </ButtonGroup>

            ) : (
                <div style={{ display: 'flex', gap: '1%' }}>
                    <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
                        <Button icon={<UserOutlined />}>
                            Login
                        </Button>
                    </Link>
                    <Link to="/register" style={{ color: 'inherit', textDecoration: 'none' }}>
                        <Button type="primary" icon={<UserAddOutlined />}>
                            Register
                        </Button>
                    </Link>
                </div>
            )}

        </Header>
    );
};

export default DefaultHeader;
