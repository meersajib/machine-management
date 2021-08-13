import { Table, Form, Space, Spin, Row, PageHeader, Empty } from 'antd';
import Admin from 'layouts/Admin.js';
import { useState,useEffect } from 'react';
import { Select } from 'antd';
const { Option } = Select;
import { useDataApi } from 'utils/data.hooks';
import { useRouter } from 'next/router';
import AuthService from 'services/auth.service';
import { deleteAllCookie } from 'utils/cookie';

export default function OfflineOnlineDevices() {
	const [current, setCurrent] = useState(1);
	const [query, setQuery] = useState('offline');
	const [form] = Form.useForm();

	const router = useRouter();

	useEffect(() => {
		const authorized = AuthService.isAuthorized('/offline-online-devices');
		if(!authorized) {
			deleteAllCookie();
			router.push('/login');
		}
	})

	const url = 'api/v1/machines/data';
	const [{ data, meta, isLoading, isError, error }, doFetch] = useDataApi(url, {status:query});

	// table columns
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
			title: 'Last Update',
			dataIndex: 'end',
		}
	];

	//table config
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

	//breadcrumb
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
		setQuery({ ...query, page: current })
		doFetch({ ...query, page: current });
	}

	const AdvancedSearchForm = () => {

		const onSelectChange = (value) => {
			const params = {};
			value && (params.status = value);
			params.page = 1;
			setQuery({ ...query, ...params });
			doFetch({ ...params });
		};


		return (
			<Form
				form={form}
				name="advanced_search"
				className="bg-white p-3 mb-3 mt-3"
				initialValues={{status: query}}
			>
				<Space direction='horizontal' size={12} wrap={true} >
					<Form.Item
						name={`status`}
						label={`Filter by machine status`}
					>
						<Select
							style={{ width: 150 }}
							className='min-width-10'
							onChange={(value)=>onSelectChange(value)}
						>
							<Option value={'online'} key={'online'}>Online</Option>
							<Option value={'offline'} key={'offline'}>Offline</Option>
						</Select>
					</Form.Item>
				</Space>
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
			<Spin spinning={isLoading} size={'default'} className={`bg-white m-`}>
				{
					data?.length ?
						<Table
							{...state}
							key={(record=>record.index)}
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

OfflineOnlineDevices.layout = Admin;