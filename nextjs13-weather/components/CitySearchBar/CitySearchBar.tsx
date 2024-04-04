import React, { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { WeatherDbData } from "@/models/weatherDbData";

const CitySearchBar = () => {
  const [search, setSearch] = useState("");
  // const debouncedSearch = useDebounce(search, 1000);
  const [isShowingSearchResults, setIsShowingSearchResults] = useState(false);

  const cities = useQuery({
    queryFn: async () => {
      if (!search) {
        setIsShowingSearchResults(false);
        return [];
      }
      try {
        const fetchedCities = await axios.get<WeatherDbData[]>(
          `/api/cities/${search}`
        );
        if (fetchedCities.status !== 200) {
          console.error(fetchedCities);
          return [];
        }
        setIsShowingSearchResults(true);

        return fetchedCities.data;
      } catch (error) {
        console.error(error);
      }
    },
    queryKey: [search.toLowerCase()],
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    cities.refetch();
  }, [search]);

  return <div className="searchBar"></div>;
};

export default CitySearchBar;
