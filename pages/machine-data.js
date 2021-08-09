import { Table,Form, Space, Spin, Row, Col, Button, PageHeader, Empty, Alert } from 'antd';
import Admin from 'layouts/Admin.js';
import { useEffect, useState } from 'react';
import { Select } from 'antd';
const { Option } = Select;
import { DatePicker } from 'antd';
import { ExportToExcel } from 'components/ExportToExcel'
import { useDataApi } from 'utils/data.hooks';
import { deleteAllCookie } from 'utils/cookie';
import AuthService from 'services/auth.service';
import { useRouter } from 'next/router'

export default function MachineDate() {
	
	const [current, setCurrent] = useState(1);
	const [form] = Form.useForm();

	const [start, setStart] = useState('');
	const [end, setEnd] = useState('');
	const [query, setQuery] = useState({});

	const router = useRouter();
	useEffect(() => {
		const authorized = AuthService.isAuthorized('/machine-data');
		if(!authorized) {
			deleteAllCookie();
			router.push('/login');
		}
		console.log('authorized', authorized);
	})

	const url = 'http://172.104.163.254:8000/api/v1/machines/data';
	const [{ data, meta, isLoading, isError, error }, doFetch] = useDataApi(url, query);
	const [{ data: all_data, isError: isError2 }, doFetch2] = useDataApi(url);

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

	const PageChange = (current, page_size) => {
		setQuery({ ...query, page: current})
		doFetch({ ...query, page: current });
	}

	const AdvancedSearchForm = () => {

		const onFinish = (values) => {
			const params = {};
			start && (params.start = start)
			end && (params.end = end)
			if (values?.machine_no?.length) {
				const numbers = values?.machine_no?.join('-');
				params.machine_no = numbers;
			}
			values?.machine_status && (params.machine_status = values?.machine_status);
			setQuery({ ...query, ...params });
			params.page=1;
			doFetch({...params });
		};

		function onOk(value) {
			// console.log('onOk: ', value);
		}

		const children = [];
		if (!isError2) {
			let unique_machine_no = all_data?.map(m => m?.machine_no)?.filter((v, i, a) => a?.indexOf(v) === i);
			for (let i = 0; i < unique_machine_no?.length; i++) {
				children.push(
					<Option key={unique_machine_no[i]}>
						{unique_machine_no[i]}
					</Option>
				);
			}

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
						<DatePicker showTime onChange={(value, dateString) => { setStart(dateString) }} onOk={onOk} />
					</Form.Item>
					<Form.Item
						name={`end`}
						label={`end`}
					>
						<DatePicker showTime onChange={(value, dateString) => { setEnd(dateString) }} onOk={onOk} />
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
								setQuery({})
								setStart('')
								setEnd('')
								setCurrent(1);
								doFetch({})
							}}
						>
							Clear
						</Button>	
						<ExportToExcel apiData={data} fileName={'machine-list'} />
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
			<Spin spinning={isLoading} size={'default'} className={`bg-white m-`}>
				{
					isError ?
						<Alert
							message="Error occured!"
							description={error || 'Something went wrong!'}
							type="error"
							showIcon
						/>
						:

						data?.length ?
							<Table
								{...state}
								key={'total_minutes'}
								pagination={{
									position: [state.top, state.bottom],
									onChange: PageChange,
									pageSize: meta?.page_size,
									total: meta?.count | 0,
									defaultCurrent: current | 1
								}}
								columns={tableColumns}
								dataSource={data || []}
								className={`p-2 bg-white`}
							/>
							:
							<Empty className={`bg-white p-5`} description={'Data not found!'} />
				}
			</Spin>
		</>
	);
}
MachineDate.layout = Admin;