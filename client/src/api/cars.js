import { useQuery, useMutation } from "@tanstack/react-query";

const options = { mode: "cors" };
const headers = { "Content-Type": "application/json;charset=utf-8" };

const fetchCars = async () => {
  const res = await fetch("http://localhost:3000/cars", {
    method: "GET",
    options: options, 
    headers: headers,
  })
  return res.json();
};

export const useCars = () => {
  const result = useQuery({
    queryKey: ["cars"],
    queryFn: fetchCars
  });
  return result;
};

const createCar = async (params) => {
  const res = await fetch("http://localhost:3000/cars", {
    method: "POST",
    options: options,
    headers: headers,
    body: JSON.stringify({car: params}),
  })
  return res.json();
};

export const useCreateCar = (refetchCars) => {
  const result = useMutation({
    mutationFn: (data) => {
			return createCar(data);
		},
    onSuccess: () => {
      refetchCars();
    },
    onError: () => {
      alert("Error!");
    }
  });
  return result;
};

const parkCar = async (params) => {
  const res = await fetch("http://localhost:3000/cars/park", {
    method: "POST",
    options: options,
    headers: headers,
    body: JSON.stringify({car: params}),
  })
  return res.json();
};

export const useParkCar = (refetchCars) => {
  const mutation = useMutation({
    mutationFn: (data) => {
			return parkCar(data);
		},
    onSuccess: () => {
      refetchCars();
    },
    onError: (error) => {
      console.log(error)
      alert("Error! ");
    }
  });
  console.log("mutation: ", mutation)
  return mutation;
};

const unparkCar = async (params) => {
  const res = await fetch("http://localhost:3000/cars/unpark", {
    method: "POST",
    options: options,
    headers: headers,
    body: JSON.stringify({car: params}),
  })
  return res.json();
};

export const useUnparkCar = (refetchCars) => {
  const result = useMutation({
    mutationFn: (data) => {
			return unparkCar(data);
		},
    onSuccess: (data) => {
      refetchCars();
      return data;
    },
    onError: () => {
      alert("Error!");
    }
  });
  return result;
};
