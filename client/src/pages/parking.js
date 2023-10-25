import React, {useState} from "react";
import { useParkings, useCreateParking } from "../api/parkings";
import { Box, TextField, Select, MenuItem, InputLabel, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';



const Parking = () => {
	const [entrances, setEntrances] = useState(3)
	const [parkingParams, setParkingParams] = useState({
		size: 1,
		distance: [0, 0, 0]
	});

	const {isLoading: isParkingLoading, data: parkings, refetch: refetchParkings} = useParkings();
	const useMutateParking = useCreateParking(refetchParkings);

	const columns = [
		{ field: 'id', headerName: 'ID', width: 90 },
		{ field: 'size', headerName: 'Size', width: 90 },
		{ field: 'distance', headerName: 'Distance', width: 90 },
		{ field: 'is_available', headerName: 'Available', width: 90 },
	]

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
		
		setParkingParams({...parkingParams,...{distance: distances}})
	}

	return (
    <>
		<div>
			<h1>
				Configure Parking
			</h1>
			<Link to="/"><Button variant="contained">Back to Home</Button></Link>
			<Grid container spacing={3} sx={{ml: 2, mr: 3, mt: 2}}>
				<Grid item xs={3}>
					<Box component="form" onSubmit={addParking} width={200} sx={{mt: 2}}>
						<InputLabel id="entrance-label">Number of Entrance</InputLabel>
						<Select
							size="small"
							labelId="entrance-label"
							id="entrance-label"
							value={entrances}
							onChange={e => changeEntrances(e.target.value)}
							sx={{mb: 2}}
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
							value={parkingParams.size}
							onChange={e => setParkingParams({...parkingParams,...{size: e.target.value}})}
							sx={{mb: 2}}
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
									sx={{mb: 2}}
								/>
						)}
						<Button variant="contained" type="submit">Add a Parking</Button>
					</Box>
				</Grid>
				<Grid item xs={4}>
					{!isParkingLoading && (
						<DataGrid rows={parkings} columns={columns} />
					)}
				</Grid>
			</Grid>
		</div>
    </>
	);
};

export default Parking;
