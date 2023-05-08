package com.auth.controller;

import java.util.Objects;

import javax.imageio.spi.RegisterableService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.auth.bean.ChangePasswordBean;
import com.auth.bean.JwtRequestObj;
import com.auth.bean.JwtResponse;
import com.auth.bean.UserEntity;
import com.auth.repository.UserRepository;
import com.auth.securityConfiguration.JwtTokenCheck;
import com.auth.service.CreateUser;
import com.auth.service.UserDetailsJwtService;


@RestController
@RequestMapping("/user")
public class AuthControllerService {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenCheck jwtTokenUtil;

	@Autowired
	private UserDetailsJwtService userDetailsService;
	
	@Autowired
	private UserRepository repo;
	
	@Autowired
	CreateUser services;
	
	private void authenticate(String username, String password) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
			
		} catch (DisabledException e) {
			throw new Exception("not found", e);
		} catch (BadCredentialsException e) {
			throw new Exception("invalid  details", e);
		}
	}

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequestObj authenticationRequest) throws Exception {

		authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

		final String token = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new JwtResponse(token));
	}


	
	@PostMapping("/update")
	public String updateUser(@RequestBody UserEntity user)
	{
		return services.updateUser(user);
		
	}
	
	@PostMapping("/create")
	public String createUser(@RequestBody UserEntity user)
	{
		return services.createUser(user);
		
	}
	@PostMapping("/update/password/{userName}")
	public UserEntity updatePassword(@RequestBody ChangePasswordBean user,@PathVariable String userName)
	{
		try {
			authenticate(userName,user.getOldpassword());
			return services.chagePassword(user,userName);

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
		}
		return null;
	}
	
	@GetMapping("/account/{userName}")
	public ResponseEntity<UserEntity> getUserAccount(@PathVariable String userName)
	{
		UserEntity user=repo.findByName(userName);
		if(user!=null)
			return new ResponseEntity<UserEntity>(user,HttpStatus.OK);
		else
			return null;
	}
}
