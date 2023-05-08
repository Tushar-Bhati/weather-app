package com.wishlist.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wishlist.bean.Wishlist;
import com.wishlist.service.WishlistService;



@RestController
@RequestMapping("/wishlist")
public class WishlistController {
	
	@Autowired
	private WishlistService services;
	
	@GetMapping("/add/{city}/{userName}")
	public ResponseEntity<String> add(@PathVariable String city,@PathVariable String userName)
	{
		String response=services.AddFavouriteCitytoWatchList(city,userName);
		return new ResponseEntity<String>(response,HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{city}/{userName}")
	public ResponseEntity<String> remove(@PathVariable String city,@PathVariable String userName)
	{
		String response=services.RemoveCity(city,userName);
		return new ResponseEntity<String>(response,HttpStatus.OK);
	}
	
	@GetMapping("/all/{userName}")
	public ResponseEntity<List<Wishlist>> get(@PathVariable String userName)
	{
		List<Wishlist> lis=services.getAllWishlist();
		lis=lis.stream().filter(name -> userName.toLowerCase().equals(name.getName().toLowerCase())).collect(Collectors.toList());
		return new ResponseEntity<List<Wishlist>>(lis,HttpStatus.OK);
	}

}
