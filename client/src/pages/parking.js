import React from "react";
import { useParkings, useCreateParking } from "../api/parkings";
import Button from '@mui/material/Button';

const Parking = () => {
	const params = {
		size: 3, 
		distance: [2,3,1],
		is_available: true
	}

	const {isLoading: isParkingLoading, data: parkings, refetch: refetchParkings} = useParkings();
	const useMutateParking = useCreateParking(refetchParkings);

	const onClick = () => {		
		useMutateParking.mutate(params)
	}

	return (
    <>
		<div>
			<h1>
				Configure Parking
			</h1>
			<Button variant="contained" onClick={()=> onClick()}>Add a Parking</Button>
			{ !isParkingLoading && parkings.map((parking)=> 
        <div key={parking.id}>{parking.id}-{parking.size}-{parking.distance}</div>
      )}
		</div>
    </>
	);
};

export default Parking;
