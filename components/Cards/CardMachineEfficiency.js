import { useEffect, useState } from "react";

export default function CardMachineEfficiency({ data }) {
	const [sorted, setSorted] = useState([])
	useEffect(() => {
		const sorted_data = data.sort((a, b) => Number(b.efficiency) - Number(a.efficiency))
		setSorted(sorted_data);
	}, [data])
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
					</div>
				</div>
				<div className="block w-full overflow-x-auto">
					<table className="items-center w-full bg-transparent border-collapse">
						<thead className="thead-light">
							<tr>
								<th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
									Machine No
								</th>
								<th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
									Efficiency
								</th>
								<th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px"></th>
							</tr>
						</thead>
						<tbody>
							{
								sorted?.length ? sorted?.map((machine, index) => (
									<tr key={index}>
										<th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
											{machine?.machine_no}
										</th>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											{machine?.efficiency || 'N/A'}
										</td>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											<div className="flex items-center">
												<span className="mr-2">{Number(machine?.efficiency).toFixed(0)}</span>
												<div className="relative w-full">
													<div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
														<div
															style={{ width: `${Number(machine?.efficiency).toFixed(0)}%` }}
															className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
														></div>
													</div>
												</div>
											</div>
										</td>
									</tr>
								))
									: null
							}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
