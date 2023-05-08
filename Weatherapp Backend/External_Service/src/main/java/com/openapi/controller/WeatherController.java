package com.openapi.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.openapi.bean.WeatherObj;

@RestController
@RequestMapping("/weather")
public class WeatherController {

	@Value("${url}")
	private String OPEN_WEATHER_URL;
	
	
	
	@Value("${forecasturl}")
	private String OPEN_Forecast_URL;

	@Autowired
	RestTemplate restTemplate;

	@Value("${apikey}")
	private String apiKey;

	@GetMapping("/get/{city}")
	public ResponseEntity<WeatherObj> getWeatherFromWeatherAPI(@PathVariable String city)
			throws JsonParseException, JsonMappingException, IOException {

		UriComponents uriComponents = UriComponentsBuilder.newInstance().scheme("https").host(OPEN_WEATHER_URL).path("")
				.query("q={keyword}&appid={appid}").buildAndExpand(city, apiKey);

		String uri = uriComponents.toUriString();

		ResponseEntity<String> resp = restTemplate.exchange(uri, HttpMethod.GET, null, String.class);

		ObjectMapper mapper = new ObjectMapper();

		WeatherObj weather = mapper.readValue(resp.getBody(), WeatherObj.class);

		return new ResponseEntity<WeatherObj>(weather, HttpStatus.OK);
	}
	
	
	
	
	
	
	
	//https://api.openweathermap.org/data/2.5/forecast?q=latur&appid=caa46c0e3a6782a59fdd22ee2273ccd6
		@GetMapping("/forecast-data/{city}/{days}")
		public ResponseEntity<Object> getWeatherForecast(@PathVariable String city)
				throws JsonParseException, JsonMappingException, IOException {

			UriComponents uriComponents = UriComponentsBuilder.newInstance().scheme("https").host(OPEN_Forecast_URL).path("")
					.query("q={keyword}&appid={appid}").buildAndExpand(city, apiKey);

			String uri = uriComponents.toUriString();
			HttpHeaders headers = new HttpHeaders();

			headers.setContentType(MediaType.APPLICATION_JSON);


			HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);

			ResponseEntity<String> resp = restTemplate.exchange(uri, HttpMethod.GET, entity, String.class);

			ObjectMapper mapper = new ObjectMapper();
			System.out.println(resp.getBody());

			return new ResponseEntity<Object>(resp.getBody(), HttpStatus.OK);
		}
		
	
	

		/*
		 * @GetMapping("/forecast-data/{city}/{days}") public ResponseEntity<Object>
		 * getWeatherForecast(@PathVariable String city, @PathVariable Integer days)
		 * throws JsonParseException, JsonMappingException, IOException {
		 * 
		 * UriComponents uriComponents =
		 * UriComponentsBuilder.newInstance().scheme("https")
		 * .host("weatherapi-com.p.rapidapi.com/forecast.json").path("").query(
		 * "q={keyword}&days={appid}") .buildAndExpand(city, days);
		 * 
		 * String uri = uriComponents.toUriString(); HttpHeaders headers = new
		 * HttpHeaders();
		 * 
		 * headers.setContentType(MediaType.APPLICATION_JSON);
		 * 
		 * headers.set("X-RapidAPI-Host", "weatherapi-com.p.rapidapi.com");
		 * headers.set("X-RapidAPI-Key",
		 * "5ce265782dmsh0e52338c4a146a8p177c8djsn2934e75abaf8");
		 * 
		 * HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
		 * 
		 * ResponseEntity<String> resp = restTemplate.exchange(uri, HttpMethod.GET,
		 * entity, String.class);
		 * 
		 * ObjectMapper mapper = new ObjectMapper();
		 * 
		 * return new ResponseEntity<Object>(resp.getBody(), HttpStatus.OK); }
		 */

}