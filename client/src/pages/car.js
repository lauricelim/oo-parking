import React, {useState} from "react";
import { Link } from 'react-router-dom';
import { Box, TextField, Select, MenuItem, InputLabel, Button } from '@mui/material';
import { useCars, useCreateCar, useParkCar, useUnparkCar } from "../api/cars";
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import * as dayjs from 'dayjs'

const Car = () => {
	const [carParams, setCarParams] = useState({
		size: 1,
	});

	const [parkParams, setParkParams] = useState({
		id: 1,
		time: dayjs().format('YYYY-MM-DDTHH:mm'),
		entry: 1,
	});

	const [unparkParams, setUnparkParams] = useState({
		id: 1,
		time: dayjs('2023-10-27T02:43').format('YYYY-MM-DDTHH:mm'),
	});

	const {isLoading: isCarLoading, data: cars, refetch: refetchCars} = useCars();
	const {mutate: UseMutateCreateCar, data: createCarData} = useCreateCar(refetchCars);
	const {mutate: UseMutateParkCar, data: parkData } = useParkCar(refetchCars);
	const {mutate: UseMutateUnparkCar, data: unparkData} = useUnparkCar(refetchCars);

	const addCar = (e) => {	
		UseMutateCreateCar(carParams)
	}

	const parkCar = (e) => {	
		UseMutateParkCar(parkParams)
	}

	const unparkCar = (e) => {	
		UseMutateUnparkCar(unparkParams)
	}

	return (
    <>
		<div>
			<h1>
				Park a Car
			</h1>
			<h1>{parkData?.selected_parking?.id}</h1>
			<h1>{unparkData?.totalFee}</h1>
			<Link to="/"><Button variant="contained">Back to Home</Button></Link>
			<form onSubmit={addCar}>
				<Box
					component="form"
					sx={{
						'& > :not(style)': { m: 1 },
					}}
					noValidate
					autoComplete="off"
				>
					<InputLabel id="size-label">Size</InputLabel>
					<Select
						size="small"
						labelId="size-label"
						id="size-label"
						label="Size"
						value={carParams.size}
						onChange={e => setCarParams({...carParams,...{size: e.target.value}})}
					>
						<MenuItem value={1}>Small</MenuItem>
						<MenuItem value={2}>Medium</MenuItem>
						<MenuItem value={3}>Large</MenuItem>
					</Select>
				</Box>
				<Button variant="contained" type="submit">Add a Parking</Button>
			</form>
			{ !isCarLoading && cars.map((car)=> 
        <div key={car.id}>
					<label>id: {car.id}</label>
					<label>size: {car.size}</label>
					<label>park time: {car.park_time}</label>
					<label>unpark time: {car.unpark_time}</label>
				</div>
      )}
			<form>
				<InputLabel id="entry-label">Size</InputLabel>
					<Select
						size="small"
						labelId="entry-label"
						id="entry-label"
						label="Entry"
						value={parkParams.entry}
						onChange={e => setParkParams({...parkParams,...{entry: e.target.value}})}
					>
						<MenuItem value={1}>1</MenuItem>
						<MenuItem value={2}>2</MenuItem>
						<MenuItem value={3}>3</MenuItem>
					</Select>
					{/* <DateTimePicker label="Basic date time picker" /> */}
					<Button variant="contained" onClick={parkCar}>Park Car</Button>
					<Button variant="contained" onClick={unparkCar}>Unpark Car</Button>
					<label>{parkParams.time}</label>
				</form>
		</div>
    </>
	);
};

export default Car;
