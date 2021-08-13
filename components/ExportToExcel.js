import React,{useState, useEffect} from 'react';
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Button } from "antd"
import { useDataApi } from 'utils/data.hooks';

export const ExportToExcel = ({ fileName, query={}, meta }) => {

	const url = 'api/v1/machines/data';
	const [{ data, isError }, doFetch] = useDataApi(url, query);

	useEffect(() => {
		doFetch({ ...query, page_size: meta?.count,page:1 })
	},[meta])

	const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
	const fileExtension = ".xlsx";

	const exportToCSV = (apiData,fileName) => {
			const ws = XLSX.utils.json_to_sheet(apiData);
			const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
			const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
			const data2 = new Blob([excelBuffer], { type: fileType });
			FileSaver.saveAs(data2, fileName + fileExtension);
	};

	return (
		<>
			<Button className="bg-lightBlue-600 text-white hover:bg-lightBlue-200" 
				htmlType="submit" onClick={(e) => exportToCSV(data,fileName)}>
					<i className='fas fa-cloud-download-alt mr-2'></i>	Export to excel
				</Button>
			
		</>
	);
};