import React, { useEffect, useState } from "react";
import { debounce } from "lodash";

import InputContainer from "./InputContainer";

import { Cities, LoadedCities } from "@/model/customTypes";
import searchIcon from "@/public/search_magnifier_mobile ui_zoom_icon.svg";
import { API_KEY, GEO_API_URL, fetchData } from "@/lib/weather-services";

type Props = {
  onCityChange: (value: string) => void;
};

function SearchBar({ onCityChange }: Props) {
  const [searchValue, setSearchValue] = useState("");
  const [citySuggestions, setCitySuggestions] = useState<LoadedCities[]>([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const debouncedGetCitySuggestions = debounce(async () => {
      if (searchValue.length > 2) {
        setIsloading(true);
        try {
          // fetch cities from api base on entered value
          const cities: Cities[] = await fetchData(
            `${GEO_API_URL}q=${searchValue}&limit=6&appid=${API_KEY}`
          );

          // transform data
          const loadedCities = cities.map((city) => {
            return {
              country: `${city.country}`,
              name: `${city.name}`,
            };
          });

          setCitySuggestions([...loadedCities]);
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message || "Something went wrong!");
          }
        }
        setIsloading(false);
      } else {
        setCitySuggestions([]);
      }
    }, 1000);
    debouncedGetCitySuggestions();
  }, [searchValue]);

  return (
    <div className="w-full">
      <div className="flex gap-1">
        <InputContainer
          className="capitalize"
          type="text"
          placeholder="Enter a city name..."
          iconAlt="search icon"
          icoSrc={searchIcon}
          value={searchValue}
          onChangeHandler={setSearchValue}
          onBlurHandler={() => {
            setTimeout(() => {
              setCitySuggestions([]);
            }, 200);
          }}
        />
      </div>
    </div>
  );
}

export default SearchBar;
