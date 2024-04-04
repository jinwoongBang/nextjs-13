import citiesData from "@/data/cities.json";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params: { cityNamePart } }: { params: { cityNamePart: string } }
) {
  console.debug(cityNamePart);
  const noRepeatCitiesNames: string[] = [];
  const filteredCities = citiesData.filter((city) => {
    if (
      noRepeatCitiesNames.includes(city.name) ||
      !city.name.toLowerCase().includes(cityNamePart.toLowerCase())
    ) {
      return false;
    }
    noRepeatCitiesNames.push(city.name);

    return true;
  });

  return NextResponse.json(filteredCities);
}
