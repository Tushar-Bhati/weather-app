package com.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.auth.bean.ChangePasswordBean;
import com.auth.bean.UserEntity;
import com.auth.repository.UserRepository;


@Service
public class CreateUser {
	
	
	@Autowired UserRepository repo;
	private UserEntity users;
	
	
	public CreateUser() {
		// TODO Auto-generated constructor stub
	}
	
	@Autowired
	PasswordEncoder encoder;
	

	
	
	public String updateUser(UserEntity user)
	{
		
		
		 users=repo.findByName(user.getName().toLowerCase());
		if(users!=null)
		{
			users.setName(user.getName().toLowerCase());
			users.setCity(user.getCity().toLowerCase());
			users.setCountry(user.getCountry().toLowerCase());

			repo.save(users);
			return "OK";
		}
		
		return "Fail";
	}
	
	

	public String createUser(UserEntity user)
	{
		 users=repo.findByName(user.getName().toLowerCase());

		if(users!=null)
			return "Fail";
		else
		{
			user.setName(user.getName().toLowerCase());
			user.setCity(user.getCity().toLowerCase());
			user.setCountry(user.getCountry().toLowerCase());
			user.setPassword(encoder.encode(user.getPassword()));
			repo.save(user);
			return "OK";
		}
		
	}
	public UserEntity chagePassword(ChangePasswordBean user,String userName)
	{
		
		
		 users=repo.findByName(userName.toLowerCase());
	

		if(users!=null)
		{
			users.setPassword(encoder.encode(user.getNewpassword()));

			repo.save(users);
			return users;
		}
		
		return null;
	}
}
