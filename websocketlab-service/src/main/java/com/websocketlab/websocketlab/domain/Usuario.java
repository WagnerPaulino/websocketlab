package com.websocketlab.websocketlab.domain;

import com.google.gson.Gson;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Usuario {
	private String[] login;

	public static Usuario fromJson(String json) {
		Gson gson = new Gson();
		return gson.fromJson(json, Usuario.class);
	}
}
