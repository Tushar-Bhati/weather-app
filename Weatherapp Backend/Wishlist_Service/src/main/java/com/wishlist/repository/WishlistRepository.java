package com.wishlist.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.wishlist.bean.Wishlist;


@Repository
public interface WishlistRepository extends MongoRepository<Wishlist, String> {
	
	//@Query("{'name' : ?0}")
	Wishlist findByName(String name);
}