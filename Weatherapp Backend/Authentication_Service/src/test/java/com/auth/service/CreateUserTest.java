package com.auth.service;


import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.auth.bean.ChangePasswordBean;
import com.auth.bean.UserEntity;
import com.auth.repository.UserRepository;


@RunWith(MockitoJUnitRunner.class)
class CreateUserTest {
	
	@InjectMocks
	 CreateUser service;
	@Mock
	 UserRepository repo;
	
	@Mock
	PasswordEncoder encoder;
	
	@BeforeEach
	public void init() {
		MockitoAnnotations.openMocks(this);

	}
	
	@Test
	void tUpdateUser() {
	
		UserEntity user=new UserEntity();
			user.setName("user");
			when(repo.findByName(user.getName())).thenReturn(null);
		assertEquals("Fail", service.updateUser(user));

	}
	
	

	@Test
	void CreateUserFail() {
	
		UserEntity test=new UserEntity();
			test.setName("test");
			when(repo.findByName(test.getName())).thenReturn(test);
		assertEquals("Fail", service.createUser(test));

	}
	
	@Test
	void CreateUserSuccess() {
	
		UserEntity User=new UserEntity();
			User.setName("test");
			User.setCity("abc");
			User.setPassword("2323");
			User.setCountry("US");
			when(repo.findByName(User.getName())).thenReturn(null);
			when(repo.save(User)).thenReturn(User);

		assertEquals("OK", service.createUser(User));

	}
	
	@Test
	void testChangePassword() {
	
		UserEntity test=new UserEntity();
		test.setName("A");
		test.setPassword("123123!");
		
		ChangePasswordBean mocko=new ChangePasswordBean();
		mocko.setOldpassword("12345");
		mocko.setOldpassword("2312");
		
		when(encoder.encode(mocko.getNewpassword())).thenReturn("sdfwefwe");
		when(repo.save(test)).thenReturn(test);
			when(repo.findByName(test.getName())).thenReturn(test);

	}
}
