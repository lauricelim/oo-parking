import React, {useState} from "react";
import { useParkings, useCreateParking } from "../api/parkings";
import { Box, TextField, Select, MenuItem, InputLabel, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Parking = () => {
	const [entrances, setEntrances] = useState(3)
	const [parkingParams, setParkingParams] = useState({
		size: 1,
		distance: [0, 0, 0]
	});

	const params = {
		size: 3, 
		distance: [2,3,1],
		is_available: true
	}

	const {isLoading: isParkingLoading, data: parkings, refetch: refetchParkings} = useParkings();
	const useMutateParking = useCreateParking(refetchParkings);

	const addParking = (e) => {	
		useMutateParking.mutate(parkingParams)
	}

	const changeEntrances = (value) => {
		let distances = [];
		setEntrances(value);
		for (let i = 0; i < value; i++) {
			if (parkingParams.distance[i]) {
				distances.push(parkingParams.distance[i]);
			} else {
				distances.push(0);
			}	
		}

		console.log("distances: ", distances)
		
		setParkingParams({...parkingParams,...{distance: distances}})
	}

	return (
    <>
		<div>
			<h1>
				Configure Parking
			</h1>
			<Link to="/"><Button variant="contained">Back to Home</Button></Link>
			<form onSubmit={addParking}>
				<Box
					component="form"
					sx={{
						'& > :not(style)': { m: 1 },
					}}
					noValidate
					autoComplete="off"
				>
					<InputLabel id="entrance-label">Number of Entrance</InputLabel>
					<Select
						size="small"
						labelId="entrance-label"
						id="entrance-label"
						label="Entrances"
						value={entrances}
						onChange={e => changeEntrances(e.target.value)}
					>
						<MenuItem value={3}>3</MenuItem>
						<MenuItem value={4}>4</MenuItem>
						<MenuItem value={5}>5</MenuItem>
					</Select>
					<InputLabel id="size-label">Size</InputLabel>
					<Select
						size="small"
						labelId="size-label"
						id="size-label"
						label="Size"
						value={parkingParams.size}
						onChange={e => setParkingParams({...parkingParams,...{size: e.target.value}})}
					>
						<MenuItem value={1}>Small</MenuItem>
						<MenuItem value={2}>Medium</MenuItem>
						<MenuItem value={3}>Large</MenuItem>
					</Select>
					{ [...Array(entrances)].map((entrance, i) => 
							<TextField
								id={"distance " + i}
								label={"distance " + (i+1)}
								margin="normal"
								onChange={e => 
									setParkingParams(
										{	...parkingParams,
											...{distance: parkingParams.distance.map((dist, index)=> 
												index === i ? parseInt(e.target.value) : parseInt(dist))}
										}
									)
								}
								required
								value={entrance}
								variant="outlined"
								color="secondary"
								type="number"
								sx={{mb: 3}}
								fullWidth
								// error={emailError}
							/>
					)}
				</Box>
				<Button variant="contained" type="submit">Add a Parking</Button>
			</form>
			{ !isParkingLoading && parkings.map((parking)=> 
        <div key={parking.id}>{parking.id}-{parking.size}-{parking.distance}</div>
      )}
		</div>
    </>
	);
};

export default Parking;
