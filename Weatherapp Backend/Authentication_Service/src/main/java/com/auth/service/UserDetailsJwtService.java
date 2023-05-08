package com.auth.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.auth.bean.UserEntity;
import com.auth.repository.UserRepository;


@Service
public class UserDetailsJwtService implements UserDetailsService{
	
	@Autowired UserRepository repos;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		UserEntity user=repos.findByName(username);
		
		if(user!=null)
			return new org.springframework.security.core.userdetails.User(username, user.getPassword(), new ArrayList<>());
		else
			throw new UsernameNotFoundException("empty");
	}

}
