package com.example.eb25vr1;

import androidx.fragment.app.FragmentActivity;

import android.os.Bundle;
import android.os.CountDownTimer;

import org.json.JSONArray;
import org.json.JSONObject;




public class MainActivity extends FragmentActivity {
    private CountDownTimer countDownTimer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
//        startTimer();
        startWeather();
    }

    public void startTimer() {
        countDownTimer = new CountDownTimer(10000, 1000) { // 10s
            public void onFinish() {
                // Khi kết thúc, có thể khởi động lại
                startTimer(); // Tạo mới và khởi động lại timer
            }

            public void onTick(long millisUntilFinished) {
                // Thực hiện yêu cầu mạng từ một luồng khác
                new Thread(new Runnable() {
                    @Override
                    public void run() {
                        String response = NetworkUtils.getData("https://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh");
                        // Đảm bảo rằng bạn chạy trên UI Thread để cập nhật UI
                        runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                System.out.println("response: " + response);
                                if (response != null && !response.isEmpty()) {
                                    try {
                                        JSONObject jsonObject = new JSONObject(response);
                                        String datetime = jsonObject.getString("datetime");
                                        System.out.println("Datetime: " + datetime);
                                    } catch (Exception e) {
                                        e.printStackTrace(); // Xử lý lỗi khi phân tích JSON
                                    }
                                } else {
                                    System.out.println("Lỗi: Response null hoặc rỗng");
                                }
                            }
                        });
                    }
                }).start();
            }
        }.start();
    }

    public void startWeather() {
        countDownTimer = new CountDownTimer(10000, 5000) { // 10s
            public void onFinish() {
                // Khi kết thúc, có thể khởi động lại
                startWeather(); // Tạo mới và khởi động lại timer
            }

            public void onTick(long millisUntilFinished) {
                // Thực hiện yêu cầu mạng từ một luồng khác
                new Thread(new Runnable() {
                    @Override
                    public void run() {
                        String response = NetworkUtils.getData("https://api.openweathermap.org/data/2.5/weather?lat=15.45&lon=108.46&appid=266e0522b961991547927444b62cd587&units=metric");
                        // Đảm bảo rằng bạn chạy trên UI Thread để cập nhật UI
                        runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                System.out.println("response: " + response);
                                if (response != null && !response.isEmpty()) {
                                    try {
                                        JSONObject jsonObject = new JSONObject(response);
                                        JSONArray weatherArray = jsonObject.getJSONArray("weather");

                                        // Lấy đối tượng đầu tiên từ mảng "weather"
                                        JSONObject weatherObject = weatherArray.getJSONObject(0);

                                        // Lấy giá trị "main"
                                        String mainWeather = weatherObject.getString("main");
                                        System.out.println("mainWeather:" + mainWeather);


                                        JSONObject mainObject = jsonObject.getJSONObject("main");
                                        String tempMain = mainObject.getString("temp");
                                        System.out.println("tempMain:" + tempMain);
                                    } catch (Exception e) {
                                        e.printStackTrace(); // Xử lý lỗi khi phân tích JSON
                                    }
                                } else {
                                    System.out.println("Lỗi: Response null hoặc rỗng");
                                }
                            }
                        });
                    }
                }).start();
            }
        }.start();
    }
}