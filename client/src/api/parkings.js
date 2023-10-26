import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const options = { mode: "cors" };
const headers = { "Content-Type": "application/json;charset=utf-8" };

const fetchParkings = async () => {
  const res = await fetch("http://localhost:3000/parkings", {
    method: "GET",
    options: options, 
    headers: headers,
  })
  return res.json();
};

export const useParkings = () => {
  const result = useQuery({
    queryKey: ["parkings"],
    queryFn: fetchParkings
  });
  return result;
};

const createParking = async (params) => {
  const res = await fetch("http://localhost:3000/parkings", {
    method: "POST",
    options: options,
    headers: headers,
    body: JSON.stringify({parking: params}),
  })
  return res.json();
};

export const useCreateParking = (refetchParkings) => {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationFn: (data) => {
			createParking(data);
		},
    onSettled: () => {
      queryClient.invalidateQueries(["parkings"]);
    },
    onError: () => {
      alert("Error Create parking!");
    }
  });
  return result;
};

const updateParking = async (params) => {
  const res = await fetch("http://localhost:3000/parkings/" + params.id, {
    method: "PATCH",
    options: options,
    headers: headers,
    body: JSON.stringify({parking: params}),
  })
  return res.json();
};

export const useUpdateParking = (refetchParkings) => {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationFn: (data) => {
			updateParking(data);
		},
    onSuccess: () => {
      refetchParkings();
    },
    onSettled: () => {
      queryClient.invalidateQueries(["parkings"]);
    },
    onError: () => {
      alert("Error Update Parking!");
    }
  });
  return result;
};

const deleteParking = async (params) => {
  const res = await fetch("http://localhost:3000/parkings/" + params.id, {
    method: "DELETE",
    options: options,
    headers: headers
  })
  return res.json();
};

export const useDeleteParking = () => {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationFn: (data) => {
			return deleteParking(data);
		},
    onSettled: (data) => {
      queryClient.invalidateQueries(["parkings", data.id]);
    },
    onError: () => {
      alert("Error delete Parking!");
    }
  });
  return result;
};
