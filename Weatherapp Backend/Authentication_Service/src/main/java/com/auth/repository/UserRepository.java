package com.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.auth.bean.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {
	
	public UserEntity findByName(String UserName);

}
