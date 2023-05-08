package com.auth.bean;

public class ChangePasswordBean {
	
	private String oldpassword;
	private String newpassword;
	
	
	public ChangePasswordBean() {
		// TODO Auto-generated constructor stub
	}
	public ChangePasswordBean(String oldpassword, String newpassword) {
		super();
		this.oldpassword = oldpassword;
		this.newpassword = newpassword;
	}
	public String getOldpassword() {
		return oldpassword;
	}
	public void setOldpassword(String oldpassword) {
		this.oldpassword = oldpassword;
	}
	public String getNewpassword() {
		return newpassword;
	}
	public void setNewpassword(String newpassword) {
		this.newpassword = newpassword;
	}

}
