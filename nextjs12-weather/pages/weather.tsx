import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";
import { API_KEY, BASE_URL, fetchData } from "@/lib/weather-services";
import { WeatherData } from "@/model/customTypes";
import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Weather() {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
    null
  );

  const [city, setCity] = useState("Seoul");
  const [tempIsLow, setTempIsLow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getWeatherData = async () => {
      setIsLoading(true);
      if (city.trim().length > 0) {
        const weather = await fetchData<WeatherData>(
          `${BASE_URL}weather?q=${city}&limit=6&appid=${API_KEY}&units=metric`
        );

        setCurrentWeather(weather);
      }
    };

    getWeatherData();
  }, [city]);

  useEffect(() => {
    // Update the background image based on the weather condition
    if (currentWeather) {
      const temp = +currentWeather?.main.temp.toFixed();
      if (temp < 3) {
        setTempIsLow(true);
      } else {
        setTempIsLow(false);
      }
    }
  }, [currentWeather]);

  function logoutHandler() {
    const data = signOut({ redirect: false, callbackUrl: "/" });
    data.then((res) => {
      // Redirect to the login page.
      router.push(res.url);
    });
  }

  const cardBg = tempIsLow ? "bg-tempLow" : "bg-tempHigh";

  return (
    <Layout
      title="Weather App"
      className={`w-3/4 ${cardBg} bg-cover bg-card bg-blend-overlay lg:w-1/4`}
    >
      <div className="weather">
        <SearchBar />
        <button
          className="btn btn__secondary"
          onClick={logoutHandler}
          type="button"
        >
          Logout
        </button>
      </div>
    </Layout>
  );
}

export default Weather;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/unauthenticated",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
