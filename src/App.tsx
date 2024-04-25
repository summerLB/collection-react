import { createElement, CSSProperties, Suspense, useEffect, useState, FC } from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { useNavigate, Route, Routes, useLocation, Navigate } from 'react-router-dom';

import allRoutes, { IRouter } from './router';
import { resolve } from './utils/path';

import './App.scss';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
	label: React.ReactNode,
	key?: React.Key | null,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: 'group',
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as MenuItem;
}

const { Content, Sider } = Layout;

const items = allRoutes.map((router) => {
	return getItem(
		router.meta?.title,
		router.path,
		createElement(router.meta?.Icon as FC),
		router.children?.map((subRouter) =>
			getItem(
				subRouter.meta?.title,
				resolve(router.path, subRouter.path),
				subRouter.meta?.Icon ? createElement(subRouter.meta?.Icon as FC) : null,
			),
		),
	);
});

type TRenderRoutes = (routes: IRouter[], parentPath?: string, breadcrumbs?: string[]) => React.ReactNode[];

const App: FC = () => {
	const navigate = useNavigate();

	const menuClick = ({ key }) => {
		navigate(key);
	};

	const renderRoutes: TRenderRoutes = (routes, parentPath = '', breadcrumb = []) =>
		routes.map((route, index: number) => {
			const { Component, children, redirect, meta } = route;
			const currentPath = resolve(parentPath, route.path);
			let currentBreadcrumb = breadcrumb;

			if (meta?.title) {
				currentBreadcrumb = currentBreadcrumb.concat([meta?.title]);
			}

			if (redirect) {
				// 重定向
				return <Route key={index} path={currentPath} element={<Navigate to={redirect} replace />} />;
			}

			if (Component) {
				// 有路由菜单
				return <Route key={index} path={currentPath} element={<Component />} />;
			}
			// 无路由菜单
			return children ? renderRoutes(children, currentPath, currentBreadcrumb) : null;
		});

	const [activeMenuItem, setActiveMenuItem] = useState('');
	const location = useLocation();

	useEffect(() => {
		setActiveMenuItem(location.pathname);
	}, [location]);

	const siderStyle: CSSProperties = {
		overflow: 'auto',
		height: '100vh',
		position: 'fixed',
		left: 0,
		top: 0,
		bottom: 0,
	};

	return (
		<Layout hasSider>
			<Sider style={siderStyle}>
				<Menu
					theme='dark'
					mode='inline'
					defaultSelectedKeys={[]}
					selectedKeys={[activeMenuItem]}
					items={items}
					onClick={menuClick}
				/>
			</Sider>
			<Layout className='site-layout'>
				<Content className='site-content'>
					<Suspense fallback={<div>loading</div>}>
						<Routes>{renderRoutes(allRoutes)}</Routes>
					</Suspense>
				</Content>
			</Layout>
		</Layout>
	);
};

export default App;
