import { useEffect } from "react";
import Chart from 'chart.js/auto';

export default function CardBarChart({ data }) {
	useEffect(() => {
		const labels = data?.map(d => `m/c-${d?.machine_no} Effi: ${Number(d?.efficiency).toFixed(2)}`)
		const ontime = data?.map(d => Number(d?.total_on_time).toFixed(0))
		const offtime = data?.map(d => Number(d?.total_off_time).toFixed(0))

		let config = {
			type: "bar",
			data: {
				labels,
				datasets: [
					{
						label: 'On Time',
						backgroundColor: "green",
						borderColor: "#fff",
						data: ontime,
						fill: false,
						barThickness: 15,
					},
					{
						label: 'Off Time',
						fill: false,
						backgroundColor: "red",
						borderColor: "#fff",
						data: offtime,
						barThickness: 15,
					},
				],
			},
			options: {
				maintainAspectRatio: false,
				responsive: true,
				title: {
					display: false,
					text: "Orders Chart",
				},
				tooltips: {
					mode: "index",
					intersect: false,
				},
				hover: {
					mode: "nearest",
					intersect: true,
				},
				legend: {
					labels: {
						fontColor: "rgba(0,0,0,.4)",
					},
					align: "end",
					position: "bottom",
				}
			},
		};
		let ctx = document.getElementById("bar-chart").getContext("2d");
		window.myBar = new Chart(ctx, config);

		return () => {
			window.myBar.destroy()
		}

	}, [data]);
	return (
		<>
			<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
				<div className="rounded-t mb-0 px-4 py-3 bg-transparent">
					<div className="flex flex-wrap items-center">
						<div className="relative w-full max-w-full flex-grow flex-1">
							<h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
								Performance
							</h6>
							<h2 className="text-blueGray-700 text-xl font-semibold">
								Machines Performance Bar Chart
							</h2>
						</div>
					</div>
				</div>
				<div className="p-4 flex-auto">
					<div className="relative h-350-px">
						<canvas id="bar-chart"></canvas>
					</div>
				</div>
			</div>
		</>
	);
}
