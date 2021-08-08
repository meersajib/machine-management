import { Form, Space, Spin, Row, Col, Button, PageHeader, Alert, Empty } from 'antd';
import Admin from 'layouts/Admin.js';
import { useState,useEffect } from 'react';
import { Select } from 'antd';
const { Option } = Select;
import { DatePicker } from 'antd';
import { useDataApi } from 'utils/data.hooks';
import {useRouter} from 'next/router';

import CardBarChart from "components/Cards/CardBarChart.js";
import CardPieChart from "components/Cards/CardPieChart.js";
import CardMachineEfficiency from "components/Cards/CardMachineEfficiency.js";
import AuthService from 'services/auth.service';
import { deleteAllCookie } from 'utils/cookie';
export default function Analytics() {
	const [form] = Form.useForm();
	const [start, setStart] = useState('');
	const [end, setEnd] = useState('');
	const [query, setQuery] = useState({});

	const router = useRouter();
	useEffect(() => {
		const authorized = AuthService.isAuthorized('/analytics');
		if(!authorized) {
			deleteAllCookie();
			router.push('/login');
		}
		console.log('authorized', authorized);
	})


	const url = 'http://172.104.163.254:8000/api/v1/machines/analytics';
	const [{ data, meta, isLoading, isError, error }, doFetch] = useDataApi(url, query);
	const [{ data: all_data, isError: isError2 }, doFetch2] = useDataApi(url);

	const pie_url = 'http://172.104.163.254:8000/api/v1/machines/total-analytics';
	const [{ data: dataPie, isError: isErrorPie, isLoading: isLoadingPie }, doFetchPie] = useDataApi(pie_url, query);

	const routes = [
		{
			path: '/',
			breadcrumbName: 'Home',
		},
		{
			path: '/analytics',
			breadcrumbName: 'Analytics',
		},
	];

	const AdvancedSearchForm = () => {

		const onFinish = (values) => {
			const params = {};
			start && (params.start = start)
			end && (params.end = end)
			if (values?.machine_no?.length) {
				const numbers = values?.machine_no?.join('-');
				params.machine_no = numbers;
			}

			values?.is_order && values.is_order==true && (params.is_order = values?.is_order);
			setQuery({ ...query, ...params });
			params.page = 1;
			doFetch({ ...params });
			doFetchPie({ ...params });
		};

		function onOk(value) {
			console.log('onOk: ', value);
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
						name={`is_order`}
						label={`Sort by machine's efficiency`}
					>
						<Select
							allowClear
							placeholder="Select"
							style={{ width: 200 }}
							className='min-width-150'
						>
							<Option value={true} key={true}>Most effient to least effient</Option>
							<Option value={false} key={false}>Least effient to most effient</Option>
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
								doFetch({})
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
				title="Analytics"
				breadcrumb={{ routes }}
				subTitle=""
			/>

			<AdvancedSearchForm />

			{
				isError ?
					<Alert
						message="Error occured!"
						description={error || 'Something went wrong!'}
						type="error"
						showIcon
					/>
					:

					<>
						<Spin spinning={isLoading} size={'default'} className={`bg-white m-`}>
							{data?.length ?
								<div className="flex flex-wrap">
									<div className="w-full px-4">
										<CardBarChart data={data} />
									</div>
								</div>
								: <Empty />}
						</Spin>

						<Spin spinning={isLoadingPie} size={'default'} className={`bg-white m-`}>
							{isErrorPie ?
								<Alert
									message="Error occured!"
									description={error || 'Something went wrong!'}
									type="error"
									showIcon
								/>
								: <div className="flex flex-wrap">
									<div className="w-full px-4">
										<CardPieChart data={dataPie} />
									</div>
								</div>
							}
						</Spin>


						<Spin spinning={isLoading} size={'default'} className={`bg-white m-`}>
							{data?.length ?
								<div className="flex flex-wrap mt-4">
									<div className="w-full px-4">
										<CardMachineEfficiency data={data} />
									</div>
								</div>
								: <Empty />}
						</Spin>
					</>

			}
		</>
	);
}
Analytics.layout = Admin;