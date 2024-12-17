import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  const [temperature, setTemperature] = useState(null); // Nhiệt độ
  const [weatherIcon, setWeatherIcon] = useState(""); // Icon thời tiết
  const [currentTime, setCurrentTime] = useState(""); // Thời gian hiện tại
  const [weatherDescription, setWeatherDescription] = useState("");
  const apiKey = "266e0522b961991547927444b62cd587"; // Thay YOUR_API_KEY bằng API Key của bạn

  // Hàm lấy dữ liệu thời tiết
  const fetchWeatherByCoordinates = async () => {
    // const latitude = 10.7546174; // Vĩ độ của TP. Hồ Chí Minh
    // const longitude = 106.3648988; // Kinh độ của TP. Hồ Chí Minh
    const latitude = 15.4359919; // Vĩ độ của núi thành
    const longitude = 108.6169731; // Kinh độ của núi thành

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();

      if (response.ok) {
        setTemperature(data.main.temp); // Lấy nhiệt độ
        setWeatherIcon(data.weather[0].icon); // Lấy mã icon thời tiết
        console.log("Cập nhật dữ liệu thời tiết thành công!");
      } else {
        // alert(`Lỗi khi lấy dữ liệu thời tiết: ${data.message}`);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      // alert("Đã xảy ra lỗi khi gọi API.");
    }
  };

  // Hàm cập nhật thời gian hiện tại
  // const updateTime = () => {
  //   const now = new Date();
  //   const formattedTime = now.toLocaleString("vi-VN", {
  //     weekday: "long",
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     second: "2-digit",
  //   });
  //   setCurrentTime(formattedTime);
  // };

  const updateTime = () => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Định dạng 24h
    });
    setCurrentTime(formattedTime);
  };

  // useEffect để gọi API và cập nhật thời gian
  useEffect(() => {
    fetchWeatherByCoordinates(); // Lấy dữ liệu thời tiết lần đầu
    updateTime(); // Cập nhật thời gian ban đầu

    const timeInterval = setInterval(updateTime, 20000); // Cập nhật thời gian mỗi giây
    const weatherInterval = setInterval(fetchWeatherByCoordinates, 60000); // Cập nhật thời tiết mỗi 1 giờ

    return () => {
      clearInterval(timeInterval); // Xóa timer thời gian
      clearInterval(weatherInterval); // Xóa timer thời tiết
    };
  }, []);
  console.log(`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`);
  return (
    <div className="App">
      <header className="App-header">
        {temperature !== null ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(0, 0, 255, 0.5)",
              borderRadius: 15,
            }}
          >
            {weatherIcon && (
              <img
                src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
                alt="Weather Icon"
                // style={{ marginRight: "10px" }}

                className="weather-icon"
              />
            )}
            <p>{Math.round(temperature)}°C </p>
            <p> </p>
            <FontAwesomeIcon
              icon={faClock}
              size="2x"
              color="#007bff"
              style={{ marginLeft: "30px", marginRight: "10px", width: 30 }}
            />
            <p
              style={{
                marginRight: 10,
              }}
            >
              {currentTime}
            </p>
          </div>
        ) : null}
      </header>
    </div>
  );
}

export default App;
