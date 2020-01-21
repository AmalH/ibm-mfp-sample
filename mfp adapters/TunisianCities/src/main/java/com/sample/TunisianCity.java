package com.sample;

public class TunisianCity {
	public String _id, _rev;
	public String name;
	public String description;
	public String picture;

	boolean hasRequiredFields() {
		return (!name.isEmpty() && !description.isEmpty() && !picture.isEmpty());
	}
}
