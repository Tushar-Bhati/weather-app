package com.wishlist.service;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;

import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.wishlist.bean.Wishlist;
import com.wishlist.repository.WishlistRepository;

@RunWith(MockitoJUnitRunner.class)
class WishlistServiceTest {

	@Mock
	WishlistRepository wishlistRepository;

	@InjectMocks
	WishlistService service;

	@BeforeEach
	public void init() {
		MockitoAnnotations.openMocks(this);

	}

	@Test
	void testAddFavouriteCitytoWatchList() {

		Wishlist wishlist = new Wishlist();
		wishlist.setName("A");
		wishlist.setCities(new ArrayList<>());
		
		
		
		when(wishlistRepository.findByName(wishlist.getName())).thenReturn(null);
		assertEquals("Ok", service.AddFavouriteCitytoWatchList("city", "A"));

	}

	@Test
	void testAddFavouriteCitytoWatchListFailure() {

		Wishlist wishlist = new Wishlist();
		wishlist.setName("A");
		wishlist.setCities(new ArrayList<>());
		wishlist.getCities().add("city");
		
		
		when(wishlistRepository.findByName(wishlist.getName())).thenReturn(wishlist);
		assertEquals("City is Already Present", service.AddFavouriteCitytoWatchList("city", "A"));

	}

	@Test
	void testAllCitylists() {

		Wishlist wishlist = new Wishlist();
		wishlist.setName("A");
		wishlist.setCities(new ArrayList<>());
		wishlist.getCities().add("city");
		List<Wishlist> lsit = new ArrayList<Wishlist>();
		lsit.add(wishlist);
		
		
		when(wishlistRepository.findAll()).thenReturn(lsit);
		assertEquals(1, service.getAllWishlist().size());

	}

}
