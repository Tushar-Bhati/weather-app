package com.wishlist.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.wishlist.bean.Wishlist;
import com.wishlist.repository.WishlistRepository;

@Service
public class WishlistService {

	@Autowired
	private WishlistRepository repo;

	public String RemoveCity(String city, String userName) {
		Wishlist watchlist = repo.findByName(userName);

		if (watchlist != null) {

			watchlist.getCities().remove(city);
			repo.save(watchlist);
			return "Ok";
		} else
			return "Fail";

	}

	public String AddFavouriteCitytoWatchList(String city, String userName) {
		Wishlist wishlist = repo.findByName(userName);

		if (wishlist != null) {

			if (wishlist.getCities().contains(city))
				return "City is Already Present";

			wishlist.getCities().add(city);

		} else {
			wishlist = new Wishlist(userName, new ArrayList<>());
			wishlist.getCities().add(city);
		}
		repo.save(wishlist);

		return "Ok";

	}

	public List<Wishlist> getAllWishlist() {
		return repo.findAll();
	}

}
