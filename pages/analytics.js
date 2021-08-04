import { Table, Switch, Radio, Form, Space, Spin, Row, Col, Input, Button, PageHeader, Empty } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Admin from 'layouts/Admin.js';
import AuthService from 'services/auth.service';
import MachineService from 'services/machine.service';
import { useState } from 'react';
import { getCookie } from 'utils/cookie';
import { Select } from 'antd';
const { Option } = Select;
import { DatePicker } from 'antd'
const { RangePicker } = DatePicker;

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import { ExportToExcel } from 'components/ExportToExcel'

export default function Index() {
	const [spinner, setSpinner] = useState(false);
	const [current, setCurrent] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [form] = Form.useForm();

	
	function randomInteger(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	// mock data 
	const columns = [
		{
			title: 'Machine No',
			dataIndex: 'machine_no',
		},
		{
			title: 'Machine Status',
			dataIndex: 'machine_status',
		},
		{
			title: 'Start Time',
			dataIndex: 'start',
		},
		{
			title: 'End Time',
			dataIndex: 'end',
		},
		{
			title: 'Total Minutes',
			dataIndex: 'total_minutes',
		},
	];

	// const config = {
	// 	type: 'bar',
	// 	data: data,
	// 	options: {
	// 		responsive: true,
	// 		plugins: {
	// 			legend: {
	// 				position: 'top',
	// 			},
	// 			title: {
	// 				display: true,
	// 				text: 'Chart.js Bar Chart'
	// 			}
	// 		}
	// 	},
	// };

	// const chart_data = {
	// 	labels: labels,
	// 	datasets: [
	// 		{
	// 			label: 'Dataset 1',
	// 			data: Utils.numbers(NUMBER_CFG),
	// 			borderColor: Utils.CHART_COLORS.red,
	// 			backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
	// 		},
	// 		{
	// 			label: 'Dataset 2',
	// 			data: Utils.numbers(NUMBER_CFG),
	// 			borderColor: Utils.CHART_COLORS.blue,
	// 			backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
	// 		}
	// 	]
	// };

	const data = [];

	for (let i = 1; i <= 20; i++) {
		data.push({
			machine_no: i,
			total_on_time: randomInteger(5,200),
			total_off_time: randomInteger(5,200),
			efficiency: randomInteger(1,100),
		});
	}

	const state = {
		bordered: false,
		loading: false,
		pagination: { position: 'bottom' },
		size: 'default',
		title: undefined,
		showHeader: true,
		scroll: undefined,
		hasData: true,
		tableLayout: undefined,
		top: 'none',
		bottom: 'bottomRight',
	};

	const tableColumns = columns.map(item => ({ ...item, ellipsis: true }));


	const routes = [
		{
			path: '/',
			breadcrumbName: 'Home',
		},
		{
			path: '/machine-data',
			breadcrumbName: 'Machine Data',
		},
	];

	const PageChange = (current, pageSize) => {
		console.log('current=', current, 'pagesize=', pageSize);
		setCurrent(current);
		setPageSize(pageSize);
	}

	const onFinish = (values) => {
		console.log('Received values of form: ', values);
	};


	const AdvancedSearchForm = () => {
		const onFinish = (values) => {
			console.log('Received values of form: ', values);
		};
		function onChange(value, dateString) {
			console.log('Selected Time: ', value);
			console.log('Formatted Selected Time: ', dateString);
		}

		function onOk(value) {
			console.log('onOk: ', value);
		}

		const children = [];
		for (let i = 0; i < data?.length; i++) {
			children.push(
				<Option key={data[i].machine_no}>
					{data[i].machine_no}
				</Option>
			);
		}

		function handleChange(value) {
			console.log(`selected ${value}`);
		}
		return (
			<Form
				form={form}
				name="advanced_search"
				onFinish={onFinish}
				className="bg-white p-3 mb-3 mt-3"
			>
				<Space direction='horizontal' size={12} wrap={true} >
					<Form.Item
						name={`start`}
						label={`Start`}
					>
						<DatePicker showTime onChange={onChange} onOk={onOk} />
					</Form.Item>
					<Form.Item
						name={`end`}
						label={`end`}
					>
						<DatePicker showTime onChange={onChange} onOk={onOk} />
					</Form.Item>


					<Form.Item
						name={`machine_no`}
						label={`Mahine No`}
					>
						<Select
							mode="multiple"
							allowClear
							placeholder="Select"
							style={{ width: 150 }}
							className='min-width-10'
						>
							{children}
						</Select>
					</Form.Item>
				</Space>

				<Row>
					<Col
						span={24}
						style={{
							textAlign: 'right',
						}}
					>
						<Button type="primary" htmlType="submit">
							Search
						</Button>
						<Button
							style={{
								margin: '0 8px',
							}}
							onClick={() => {
								form.resetFields();
							}}
						>
							Clear
						</Button>
					</Col>
				</Row>
			</Form>
		);
	};

	return (
		<>
			<PageHeader
				className={`p-3 bg-white mb-3`}
				title="Machine Data"
				breadcrumb={{ routes }}
				subTitle=""
			/>
			<AdvancedSearchForm />
			<Spin spinning={spinner} size={'default'} className={`bg-white m-`}>
				{
					data?.length ?
						<>
							<div className="flex flex-wrap">
								<div className="w-full xl:w-4/12 px-4">
									<CardBarChart data={data} />
								</div>
								<div className="w-full xl:w-4/12 px-4">
									<CardSocialTraffic data={data}/>
								</div>
							</div>
						</>

						:
						<Empty className={`bg-white p-5`} description={'Data not found!'} />
				}

			</Spin>
		</>
	);
}

export async function getServerSideProps(context) {
	const isAuthenticated = AuthService.isAuthorized(context);
	if (!isAuthenticated) {
		return {
			redirect: { destination: '/login', permanent: false },
		};
	}
	const query = context?.query;
	console.log('query', query);
	const token = getCookie('mctoken', context);
	let data = [];
	try {
		const response = await MachineService.getAnalytics(query, token);;
		data = response?.data;
		console.log('data', data);
	} catch (error) {
		const msg = error?.response?.data?.message || 'Something went working! please try again.';
		console.log('error message ', msg);
	}

	return {
		props: { data },
	};
}

Index.layout = Admin;