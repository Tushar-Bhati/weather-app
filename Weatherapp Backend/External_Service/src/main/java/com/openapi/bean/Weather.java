package com.openapi.bean;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Bean;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Weather {

	private List<String> forecast = new ArrayList<String>();
	private String test;

	public String getTest() {
		return test;
	}

	public void setTest(String test) {
		this.test = test;
	}

	public List<String> getForecast() {
		return forecast;
	}

	public void setForecast(List<String> forecast) {
		this.forecast = forecast;
	}

	@JsonProperty("forecast")
	public void setForecast(Map<String, Object[]> resp) {
		setForecastday(resp.get(0));
		System.out.println();
	}

	@JsonProperty("forecastday")
	public void setForecastday(Object[] resp) {
		String response = resp[0].toString();
		this.test = response;
	}

}