package com.wishlist.bean;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "wishlistcollection")
public class Wishlist {

	@Id
	private String name;
	private List<String> cities;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<String> getCities() {
		return cities;
	}
	public void setCities(List<String> cities) {
		this.cities = cities;
	}
	public Wishlist(String name, List<String> cities) {
		super();
		this.name = name;
		this.cities = cities;
	}
	
	public Wishlist() {
		// TODO Auto-generated constructor stub
	}

}
