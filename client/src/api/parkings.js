import { useQuery, useMutation } from "@tanstack/react-query";

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
  const result = useMutation({
    mutationFn: (data) => {
			createParking(data);
		},
    onSuccess: () => {
      refetchParkings();
    },
    onError: () => {
      alert("Error!");
    }
  });
  return result;
};
