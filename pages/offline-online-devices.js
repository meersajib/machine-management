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

import {ExportToExcel} from 'components/ExportToExcel'

export default function Index() {
	const [spinner, setSpinner] = useState(false);
	const [current, setCurrent] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [form] = Form.useForm();
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

	const data = [];

	for (let i = 1; i <= 100; i++) {
		data.push({
			machine_no: i,
			machine_status: i / 2 ? 'on' : 'off',
			start: new Date().toLocaleString(),
			end: new Date().toLocaleString(),
			total_minutes: i + 2,
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
			path: '/offline-online-devices',
			breadcrumbName: 'Offline Online Devices',
		},
	];

	const PageChange = (current, pageSize) => {
		console.log('current=', current, 'pagesize=', pageSize);
		setCurrent(current);
		setPageSize(pageSize);
	}

	const AdvancedSearchForm = () => {
		const onFinish = (values) => {
			console.log('Received values of form: ', values);
		};

	
		return (
			<Form
				form={form}
				name="advanced_search"
				onFinish={onFinish}
				className="bg-white p-3 mb-3 mt-3"
			>
				<Space direction='horizontal' size={12} wrap={true} >
				<Form.Item
						name={`machine_status`}
						label={`Mahine Status`}
					>
						<Select
							allowClear
							placeholder="Select"
							style={{ width: 100 }}
							className='min-width-10'
						>
							<Option value={'on'} key={'on'}>On</Option>
							<Option value={'off'} key={'off'}>Off</Option>
						</Select>
					</Form.Item>
				</Space>
				<Button type="primary" htmlType="submit" className="mr-3 ml-3">
							Search
						</Button>
						<Button	onClick={() => {form.resetFields();}}	>
							Clear
						</Button>
				<Row>
				</Row>
			</Form>
		);
	};

	return (
		<>
			<PageHeader
				className={`p-3 bg-white mb-3`}
				title="Offline Online Devices"
				breadcrumb={{ routes }}
				subTitle=""
			/>
			<AdvancedSearchForm />
			<Spin spinning={spinner} size={'default'} className={`bg-white m-`}>
				{
					data?.length ?
						<Table
							{...state}
							pagination={{ position: [state.top, state.bottom], onChange: PageChange, total: data?.length | 0, defaultCurrent: current | 1 }}
							columns={tableColumns}
							dataSource={state.hasData ? data : null}
							className={`p-2 bg-white`}
						/>
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
	try {
		const response = await MachineService.getMachineData(query, token);;
		const data = response?.data;
		console.log('data', data);
	} catch (error) {
		const msg = error?.response?.data?.message || 'Something went working! please try again.';
		console.log('error message ', msg);
	}

	return {
		props: {},
	};
}

Index.layout = Admin;