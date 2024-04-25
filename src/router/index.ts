import { lazy } from 'react';

import Home from '../pages/home';
import { BrowserRouterProps } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

export interface IRouter {
	path: string;
	redirect?: string;
	Component?: React.FC<BrowserRouterProps> | (() => any);
	/**
	 * 当前路由是否全屏显示
	 */
	isFullPage?: boolean;
	/**
	 * meta未赋值 路由不显示到菜单中
	 */
	meta?: {
		title?: string;
		Icon?: React.FC;
		/**
		 * 侧边栏隐藏该路由
		 */
		hidden?: boolean;
		/**
		 * 单层路由
		 */
		single?: boolean;
	};
	children?: IRouter[];
}

const allRoutes: IRouter[] = [
	{
		path: '/',
		Component: Home,
		meta: {
			title: '首页',
			Icon: UserOutlined,
		},
	},
	{
		path: '/antd',
		meta: {
			title: 'Ant Design组件',
			Icon: UserOutlined,
		},
		children: [
			{
				path: 'button',
				Component: lazy(() => import('../pages/antd/button')),
				meta: {
					title: 'Button',
				},
			},
		],
	},
	{
		path: '/amap',
		Component: lazy(() => import('../pages/amap')),
		meta: {
			hidden: false,
			title: '高德地图',
			Icon: UserOutlined,
		},
	},
	{
		path: '/study',
		meta: {
			title: '学习demo',
			Icon: UserOutlined,
		},
		children: [
			{
				path: 'demo1',
				Component: lazy(() => import('../pages/study/demo1')),
				meta: {
					title: 'Demo1',
				},
			},
		],
	},
	{
		path: '/other',
		Component: lazy(() => import('../pages/other')),
		meta: {
			hidden: false,
			title: '其他',
			Icon: UserOutlined,
		},
	},
];

export default allRoutes;
