import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

function Weather() {
  const [currentWeather, setCurrentWeather] = useState(null);

  const [city, setCity] = useState("Seoul");
  const [tempIsLow, setTempIsLow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  return <div>weather</div>
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
