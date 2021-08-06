import { useEffect, useState } from "react";

export default function ParameterDataTable({ data }) {

	return (
		<>
			<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
				<div className="rounded-t mb-0 px-4 py-3 border-0">
					<div className="flex flex-wrap items-center">
						<div className="relative w-full px-4 max-w-full flex-grow flex-1">
							<h3 className="font-semibold text-base text-blueGray-700">
								Machine Performance List
							</h3>
						</div>
						<div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
						</div>
					</div>
				</div>
				<div className="block w-full overflow-x-auto">
					{/* Projects table */}
					<table className="items-center w-full bg-transparent border-collapse">
						<thead className="thead-light">
							<tr>
								<th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
									Topic Name
								</th>
								<th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
									Data
								</th>
							</tr>
						</thead>
						<tbody>
							{Object.entries(data).map(([k, v]) =>
							<tr>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
										 Parameter:	{k}
										</td>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											{v}
										</td>
									</tr>)}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
