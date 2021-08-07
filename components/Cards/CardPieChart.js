import React from "react";
import Chart from 'chart.js/auto';
import { dateString } from 'utils';

export default function CardPieChart({data}) {

  React.useEffect(() => {

		console.log('data in pie chart', data);
		
		
		const pie_data = {
			labels: [
				'Off Time',
				'On Time'
			],
			datasets: [{
				label: 'Machines Efficiency',
				data: [Number(data?.total_off_time || 0).toFixed(0), Number(data?.total_on_time || 0).toFixed(0)],
				backgroundColor: [
					'rgb(255, 0, 0)',
					'rgba(0, 255, 0)',
				],
				hoverOffset: 4
			}]
		};

		const config = {
			type: 'pie',
			data: pie_data,
			options: {
				responsive: true,
				plugins: {
					legend: {
						position: 'top',
					},
					title: {
						display: false
					}
				}
			},
		};

    var ctx = document.getElementById("pie-chart").getContext("2d");
    window.myPie = new Chart(ctx, config);
		return () => {
			window.myPie.destroy()
		}
  }, [data]);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg bg-white rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h2 className="text-blueGray-700 text-xl font-bold">Machines Efficiency</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          <div style={{ width: 350}} className="relative h-350-px mx-auto">
            <canvas id="pie-chart"></canvas>
          </div>
					<h5 className="mx-auto text-center font-semibold">
						Total Efficiency {Number(data?.efficiency).toFixed(2)} %
					</h5>
					<h6 className="mx-auto text-center mt-1">
						{dateString(data?.start)} - { dateString(data?.end)}
					</h6>
        </div>
      </div>
    </>
  );
}
