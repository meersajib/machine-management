import { Table, Switch, Radio, Form, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import React from 'react';
import Admin from '../../layouts/Admin';

const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
	},
	{
		title: 'Age',
		dataIndex: 'age',
		sorter: (a, b) => a.age - b.age,
	},
	{
		title: 'Address',
		dataIndex: 'address',
		filters: [
			{
				text: 'London',
				value: 'London',
			},
			{
				text: 'New York',
				value: 'New York',
			},
		],
		onFilter: (value, record) => record.address.indexOf(value) === 0,
	},
	{
		title: 'Action',
		key: 'action',
		sorter: true,
		render: () => (
			<Space size="middle">
				<a>Delete</a>
				<a className="ant-dropdown-link">
					More actions <DownOutlined />
				</a>
			</Space>
		),
	},
];

const data = [];
for (let i = 1; i <= 10; i++) {
	data.push({
		key: i,
		name: 'John Brown',
		age: `${i}2`,
		address: `New York No. ${i} Lake Park`,
		description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
	});
}

const showHeader = true;
const footer = () => 'Here is footer';
const pagination = { position: 'bottom' };

export default function Hello () {

	const options = {
		bordered: false,
		loading: false,
		pagination,
		size: 'default',
		title: undefined,
		showHeader,
		footer,
		rowSelection: {},
		scroll: undefined,
		hasData: true,
		tableLayout: undefined,
		top: 'none',
		bottom: 'bottomRight',
	}
	const tableColumns = columns.map(item => ({ ...item, ellipsis: true })); 
    
	return (
		<Table
			{...options}
			pagination={{ position: [options.top, options.bottom] }}
			columns={tableColumns}
			dataSource={options.hasData ? data : null}
		/>
	)
}

Hello.layout = Admin;