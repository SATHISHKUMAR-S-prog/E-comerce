package com.project.Eccomerce.Model;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.Eccomerce.Domain.User_Role;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode

//@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY) // this line for security because we can't fetch this password in front end only we can write it
	private String password;
	
	private String email;
	
	private String fullname;
	
	private String mobile;
	
	private User_Role role = User_Role.ROLE_CUSTOMER; // here we set default as customer
	
	@OneToMany // one user has multiple address
	private Set<Address> address = new HashSet<>(); // here the customer enter their address and we set the address to address class 
	
	@ManyToMany // multiple coupon can used by multiple user
	@JsonIgnore // this line for ignore the coupon when fetch about user details in front-end 
	private Set<Coupon> usedCoupons = new HashSet<>(); //here if user use a coupon once again we can prevent it
}
