import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const Home = () => {

	return (
    <>
		<div>
			<h1>
				Home
			</h1>
      <Link to="/parking"><Button variant="contained">Configure Parking</Button></Link>
      <Link to="/car"><Button variant="contained">Park a Car</Button></Link>
		</div>
    </>
	);
};

export default Home;
