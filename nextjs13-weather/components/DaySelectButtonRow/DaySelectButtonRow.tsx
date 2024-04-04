import { WeatherListElement } from "@/models/weatherRequest";
import React from "react";
import DaySelectButton from "../DaySelectButton/DaySelectButton";

interface DaySelectButtonRowProps {
  dayShowing: number;
  sixDaysInfo: Map<string, WeatherListElement[]>;
  setDayShowing: (day: number) => void;
}

const DaySelectButtonRow = ({
  dayShowing,
  sixDaysInfo,
  setDayShowing,
}: DaySelectButtonRowProps) => {
  return (
    <div>
      {Array.from(sixDaysInfo?.keys() || []).map((key, index) => {
        const mapDayWeather = sixDaysInfo.get(key);
        if (mapDayWeather)
          return (
            <DaySelectButton
              key={key}
              isSelected={dayShowing === index}
              onClick={() => setDayShowing(index)}
              date={mapDayWeather[0].dt_txt.split(" ")[0].slice(5) ?? ""}
              text={""}
            />
          );
      })}
    </div>
  );
};

export default DaySelectButtonRow;
