package com.openapi.bean;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Bean;

@JsonIgnoreProperties(ignoreUnknown = true)
public class WeatherObj {

	private String temp;
	private String mintemp;
	private String maxtemp;
	private String pressure;
	private String humidity;
	private String sunrise;
	private String sunset;
	private String weatherDescription;
	private double lon;
	private String name;
	private double lat;

	public String getTemp() {
		return temp;
	}

	public void setTemp(String temp) {
		this.temp = temp;
	}

	public String getMintemp() {
		return mintemp;
	}

	public void setMintemp(String mintemp) {
		this.mintemp = mintemp;
	}

	public String getMaxtemp() {
		return maxtemp;
	}

	public void setMaxtemp(String maxtemp) {
		this.maxtemp = maxtemp;
	}

	public String getPressure() {
		return pressure;
	}

	public void setPressure(String pressure) {
		this.pressure = pressure;
	}

	public String getHumidity() {
		return humidity;
	}

	public void setHumidity(String humidity) {
		this.humidity = humidity;
	}

	public String getSunrise() {
		return sunrise;
	}

	public void setSunrise(String sunrise) {
		this.sunrise = sunrise;
	}

	public String getSunset() {
		return sunset;
	}

	public void setSunset(String sunset) {
		this.sunset = sunset;
	}

	@JsonProperty("main")
	public void setMain(Map<String, String> main) {
		setTemp(main.get("temp"));
		setMintemp(main.get("temp_min"));
		setMaxtemp(main.get("temp_max"));
		setPressure(main.get("pressure"));
		setHumidity(main.get("humidity"));

	}

	@JsonProperty("sys")
	public void setWinds(Map<String, String> sys) {
		setSunrise(sys.get("sunrise"));
		setSunset(sys.get("sunset"));

	}

	@Bean
	public WeatherObj weather() {
		return new WeatherObj();
	}

	public WeatherObj() {
		super();
		// TODO Auto-generated constructor stub
	}

	public WeatherObj(WeatherObj weather) {
		// TODO Auto-generated constructor stub
	}

	public double getLat() {
		return lat;
	}

	@JsonProperty("lat")
	public void setLat(double lat) {
		this.lat = lat;
	}

	public String getName() {
		return name;
	}

	@JsonProperty("name")
	public void setName(String name) {
		this.name = name;
	}

	public String getWeatherDescription() {
		return weatherDescription;
	}

	public void setWeatherDescription(String weatherDescription) {
		this.weatherDescription = weatherDescription;
	}

	@JsonProperty("weather")
	public void setWeather(List<Map<String, Object>> weatherEntries) {
		Map<String, Object> weather = weatherEntries.get(0);
		setWeatherDescription((String) weather.get("description"));
	}

	@JsonProperty("lon")
	public double getLon() {
		return lon;
	}

	@JsonProperty("lon")
	public void setLon(double lon) {
		this.lon = lon;
	}

	@JsonProperty("coord")
	public void setCoord(Map<String, Object> coord) {
		setLon((double) coord.get("lon"));
		setLat((double) coord.get("lat"));

	}

	@Override
	public String toString() {
		return "Weather [weatherDescription=" + weatherDescription + ", lon=" + lon + ", name=" + name + ", lat=" + lat
				+ ", temp=" + temp + ", mintemp=" + mintemp + ", maxtemp=" + maxtemp + ", pressure=" + pressure
				+ ", humidity=" + humidity + ", sunrise=" + sunrise + ", sunset=" + sunset + "]";
	}

}