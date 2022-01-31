import { Layout, Menu, Row } from 'antd';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { RouteNames } from '../router';
import { AuthActionCreators } from '../store/reducers/auth/actionCreators';

const Navbar: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {logout} = useActions()

    const {isAuth, user} = useTypedSelector(state => state.auth)

    const navigateToLogin = () => {
        navigate(RouteNames.LOGIN)
    }
    return (
        <Layout.Header>
            <Row justify='end'>
                {isAuth
                    ?
                    <>
                    <div style={{fontSize: '20px', marginRight: '20px', color: 'white'}}>{user.username}</div>
                    <Menu theme="dark" mode="horizontal" selectable={false} style={{justifyContent: 'flex-end'}}>
                        <Menu.Item onClick={() => logout()} key="1">ВЫЙТИ</Menu.Item>
                    </Menu>
                    </>
                    :
                    
                    <Menu theme="dark" mode="horizontal" selectable={false} style={{ justifyContent: 'flex-end'}}>
                        <Menu.Item onClick={() => navigateToLogin()} key="1">ЛОГИН</Menu.Item>
                    </Menu>
                }
            </Row>
        </Layout.Header>
    );
};

export default Navbar;