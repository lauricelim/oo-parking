import { useQuery } from "@tanstack/react-query";

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
  console.log(result)
  return result;
};