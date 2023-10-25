import { useParkings } from "../api/useParkings";
import { Link } from 'react-router-dom';

const Home = () => {
  const {isLoading: isParkingLoading, data: parkings} = useParkings();
  console.log("data: ", parkings)

	return (
    <>
		<div>
			<h1>
				Home
			</h1>
      <Link to="/parking"><button>Configure Parking</button></Link>
      <Link to="/car"><button>Park a Car</button></Link>
      { !isParkingLoading && parkings.map((parking)=> 
        <div key={parking.id}>{parking.id}-{parking.size}-{parking.distance}</div>
      )}
		</div>
    </>
	);
};

export default Home;
