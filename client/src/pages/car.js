import React, {useState} from "react";
import { Link } from 'react-router-dom';
import { Box, TextField, Select, MenuItem, InputLabel, Button, Grid, FormControl } from '@mui/material';
import { useCars, useCreateCar, useDeleteCar, useParkCar, useUnparkCar } from "../api/cars";
import * as dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DataGrid } from '@mui/x-data-grid';

var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

const SIZE = {
	1: "Small",
	2: "Medium",
	3: "Large"
}

const Car = () => {
	const [carParams, setCarParams] = useState({
		size: 1,
	});
	const [selectedCar, setSelectedCar] = useState(null);

	const carColumns = [
		{ field: 'id', headerName: 'ID'},
		{ field: 'size', headerName: 'Size',
			valueFormatter: (params) => {
				return SIZE[params.value];
			}
		},
		{ field: 'park_time', headerName: 'Park Time', width: 200,
			valueFormatter: (params) => {
				return params.value ? 
							dayjs(params.value).format('YYYY-MM-DD hh:mm A') : ""
			}
		},
		{ field: 'unpark_time', headerName: 'Unpark Time', width: 200,
			valueFormatter: (params) => {
				return params.value ? 
							dayjs(params.value).format('YYYY-MM-DD hh:mm A') : ""
		}
		},
		{ field: 'parking_id', headerName: 'Parked At'},
	]

	const {isLoading: isCarLoading, data: cars, refetch: refetchCars} = useCars();
	const {mutate: UseMutateCreateCar} = useCreateCar(refetchCars);
	const {mutate: UseMutateParkCar, data: parkData } = useParkCar(refetchCars);
	const {mutate: UseMutateUnparkCar, data: unparkData} = useUnparkCar(refetchCars);
	const {mutate: UseMutateDeleteCar, isPending: isDeleteCarPending} = useDeleteCar();

	const addCar = () => {	
		UseMutateCreateCar(carParams)
	}

	const parkCar = () => {
		let params = {
			...selectedCar,
			...{
					park_time: dayjs(selectedCar?.park_time).utc(),
					unpark_time: dayjs(selectedCar?.unpark_time).utc()
				}
		}
		UseMutateParkCar(params)
		setSelectedCar(null)
	}

	const unparkCar = (e) => {
		let params = {
			...selectedCar,
			...{
					park_time: dayjs(selectedCar?.park_time).utc(),
					unpark_time: dayjs(selectedCar?.unpark_time).utc()
				}
		}
		UseMutateUnparkCar(params)
		setSelectedCar(null)
	}

	const selectCar = (id) => {
		let selected = cars.find((car) => car.id == id)
		setSelectedCar(
			{...selected, 
				...{
						park_time: selected?.park_time ? dayjs(selected?.park_time) : dayjs(), 
						unpark_time: selected?.unpark_time ? dayjs(selected?.unpark_time) : dayjs()
					}
			}
		)
	}

	const deleteCar = () => {
		UseMutateDeleteCar(selectedCar)
		setSelectedCar(null)
	}

	return (
    <>
		<div>
			<h1>
				Park a Car
			</h1>
			<Link to="/"><Button variant="contained">Back to Home</Button></Link>
			<Grid container spacing={2} sx={{ml: 2, mr: 3, mt: 2}}>
				<Grid item xs={4}>
					<h2>Create a Car</h2>
					<Box component="form" onSubmit={addCar}>
						<FormControl>
							<InputLabel id="car-size-label">Size</InputLabel>
							<Select
								labelId="car-size-label"
								id="car-size-select"
								value={carParams.size}
								label="Size"
								onChange={e => setCarParams({...carParams,...{size: e.target.value}})}
								sx={{mb: 2, mr: 2}}
							>
								<MenuItem value={1}>Small</MenuItem>
								<MenuItem value={2}>Medium</MenuItem>
								<MenuItem value={3}>Large</MenuItem>
							</Select>
						</FormControl>
						<Button variant="contained" sx={{mt:1}} type="submit">Add a Car</Button>
					</Box>
					<h2>Park/Unpark a Car</h2>
					{selectedCar && (
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<Box component="section">
								<Box sx={{mb: 2}}>
									<label>Car #{selectedCar?.id}</label>
									<Button variant="contained" color="error" sx={{ml: 2}}
										onClick={deleteCar} 
										disabled={selectedCar.parking_id}
									>
										Delete
									</Button>
								</Box>
							</Box>
							{!selectedCar.parking_id && (
								<Box component="section">
									<FormControl>
										<InputLabel id="car-entry-label">Entry</InputLabel>
										<Select
											labelId="car-entry-label"
											id="car-entry-select"
											label="Entry"
											value={selectedCar?.entry}
											defaultValue={1}
											sx={{mr: 1}}
											onChange={e => setSelectedCar({...selectedCar, ...{entry: e.target.value}})}
										>
											<MenuItem value={1}>1</MenuItem>
											<MenuItem value={2}>2</MenuItem>
											<MenuItem value={3}>3</MenuItem>
										</Select>
									</FormControl>
									<DateTimePicker
										id="dtParkTime"
										label="Park Time"
										sx={{mr: 2}}
										value={dayjs(selectedCar?.park_time)}
										onChange={(newValue) => {
												setSelectedCar({...selectedCar,...{park_time: dayjs(newValue).format('YYYY-MM-DDTHH:mm')}})
											}
										}
									/>
									<Button variant="contained" sx={{mt: 1}} onClick={parkCar}>Park Car</Button>
								</Box>
							)}
							{selectedCar.parking_id && (
								<Box component="section">
									<DateTimePicker 
										label="Unpark Time" 
										sx={{mr: 2}}
										value={dayjs(selectedCar?.unpark_time)}
										onChange={(newValue) => {
											setSelectedCar({...selectedCar,...{unpark_time: dayjs(newValue).format('YYYY-MM-DDTHH:mm')}})
										}}
									/>
									<Button variant="contained" sx={{mt: 1}} onClick={unparkCar}>Unpark Car</Button>
								</Box>
							)}
							
						</LocalizationProvider>
					)}
				<h2>Total Parking Fee: {unparkData?.totalFee}</h2>	
				</Grid>
				<Grid item xs={6}>
					<h2>Select a row to edit</h2>
					{!isCarLoading && !isDeleteCarPending &&(
						<DataGrid 
							rows={cars}
							columns={carColumns}
							onRowSelectionModelChange={(id)=> selectCar(id)}
						/>
					)}
				</Grid>
			</Grid>
		</div>
    </>
	);
};

export default Car;
