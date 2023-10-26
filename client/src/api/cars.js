import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => {
			createCar(data);
		},
    onSuccess: () => {
      refetchCars();
    },
    onSettled: () => {
      queryClient.invalidateQueries(["cars"]);
    },
    onError: () => {
      alert("Error createCar!");
    }
  });
  return mutation;
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
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => {
			return parkCar(data);
		},
    onSuccess: () => {
      refetchCars();
    },
    onSettled: () => {
      queryClient.invalidateQueries(["cars"]);
    },
    onError: () => {
      alert("Error parkCar!");
    }
  });
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
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => {
			return unparkCar(data);
		},
    onSuccess: () => {
      refetchCars();
    },
    onSettled: () => {
      queryClient.invalidateQueries(["cars"]);
    },
    onError: () => {
      alert("Error unparkCar!");
    }
  });
  return mutation;
};

const deleteCar = async (params) => {
  const res = await fetch("http://localhost:3000/cars/" + params.id, {
    method: "DELETE",
    options: options,
    headers: headers
  })
  return res.json();
};

export const useDeleteCar = () => {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationFn: (data) => {
			return deleteCar(data);
		},
    onSettled: (data) => {
      queryClient.invalidateQueries(["cars", data.id]);
    },
    onError: () => {
      alert("Error delete Parking!");
    }
  });
  return result;
};