import { useEffect, useRef } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';
import '@amap/amap-jsapi-types';
import './mapContainer.scss';

const MapContainer = () => {
	let map: any = null;

	const driving = useRef(null);

	const mapOptions: AMap.MapOptions = {
		// 设置地图容器id
		viewMode: '3D', // 是否为3D地图模式
		zoom: 12, // 初始化地图级别
		center: [113.34, 23.1], // 初始化地图中心点位置
		// mapStyle: 'amap://styles/whitesmoke',  //设置地图的显示样式
	};

	const mapClickHandler = (e) => {
		const { target, lnglat, pixel, type } = e;
		console.log('target', target);
		console.log('lnglat', lnglat);
		console.log('pixel', pixel);
		console.log('type', type);
	};

	const mapDblClickHandler = (e) => {
		console.log('type', e.type);
		// 非精确点
		const { lng, lat } = e.lnglat;
		map.setCenter(new AMap.LngLat(lng, lat));
	};

	useEffect(() => {
		AMapLoader.load({
			key: '34373f7b8c877a132a6466a57355f391', // 申请好的Web端开发者Key，首次调用 load 时必填
			version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
			plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
		})
			.then((AMap) => {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				map = new AMap.Map('container', mapOptions);
				AMap.plugin(['AMap.ToolBar', 'AMap.Driving', 'AMap.Scale', 'AMap.MapType'], function () {
					//异步同时加载多个插件
					map.addControl(new AMap.ToolBar());
					map.addControl(new AMap.Scale());
					map.addControl(new AMap.MapType());
					driving.current = new AMap.Driving(); //驾车路线规划

					// const satellite = new AMap.TileLayer.Satellite();
					// map.add(satellite);
					map.on('click', mapClickHandler);
					map.on('dblclick', mapDblClickHandler);
					map.on('complete', function () {
						// 地图图块加载完成后触发
						console.log('map complete!');
					});
				});
			})
			.catch((e) => {
				console.log(e);
			});

		return () => {
			map?.destroy();
		};
	}, []);

	return <div id='container' className='amap-container'></div>;
};

export default MapContainer;
