"use client";
import { WeatherListElement, WeatherRequest } from "@/models/weatherRequest";
import { getWeatherLink } from "@/services/weatherLink";
import { useChosenCity } from "@/store/useChosenCity";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import DaySelectButtonRow from "../DaySelectButtonRow/DaySelectButtonRow";
import DayWeatherInfo from "../DayWeatherInfo/DayWeatherInfo";

const WeatherInfoBar = () => {
  const { chosenCity } = useChosenCity();
  const [dayShowing, setDayShowing] = useState(0);
  const [sixDaysInfo] = useState(new Map<string, WeatherListElement[]>());

  useEffect(() => {
    setDayShowing(0);
  }, [chosenCity.id]);

  const weather = useQuery({
    queryFn: async () => {
      const weatherLink = getWeatherLink(chosenCity.coord);
      if (!weatherLink) return null;
      const { data: fetchedWeather } = await axios.get<WeatherRequest>(
        weatherLink
      );

      const sixDaysInfoKeys = Array.from(sixDaysInfo.keys());
      sixDaysInfoKeys.map((key) => {
        sixDaysInfo.set(key, []);
      });
      fetchedWeather.list.forEach((listInfoItem) => {
        const listInfoItemDay = listInfoItem.dt_txt.split(" ")[0];
        const mapDayWeather = sixDaysInfo.get(listInfoItemDay);
        if (!mapDayWeather?.length) {
          sixDaysInfo.set(listInfoItemDay, [listInfoItem]);
        }
        if (mapDayWeather?.length) {
          mapDayWeather.push(listInfoItem);
        }
      });
      return fetchedWeather;
    },
    queryKey: [chosenCity.id],
    // throwOnError: (e: Error) => {
    //   console.error(e);
    // },
  });

  console.log(sixDaysInfo);

  if (weather.isLoading) return <div>loading...</div>;

  return (
    <div
      className={`weatherInfoBar
      w-full
      h-full
      gap-8
      flex
      flex-grow
      flex-col`}
    >
      <h4
        className={`weatherInfoBar__citySelected
        font-bold
        text-[1.5rem]`}
      >
        선택된 도시: {weather?.data?.city.name}
      </h4>

      <DaySelectButtonRow />
      <div
        className={`w-full
      h-full
      weatherInfoBar__infoList`}
      >
        {Array.from(sixDaysInfo.keys()).map((key, index) => {
          const dayInfo = sixDaysInfo.get(key);
          if (dayInfo && index === dayShowing) {
            return <DayWeatherInfo key={key} />;
          } else {
            return <Fragment key={key}></Fragment>;
          }
        })}
      </div>
    </div>
  );
};

export default WeatherInfoBar;
