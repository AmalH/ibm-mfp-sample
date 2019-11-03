package com.sample;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.lightcouch.NoDocumentException;

import com.cloudant.client.api.Database;
import com.ibm.mfp.adapter.api.AdaptersAPI;
import com.ibm.mfp.adapter.api.OAuthSecurity;

@Path("/")
@OAuthSecurity(scope = "UserLogin")
public class CloudantJavaResource {

	@Context
	AdaptersAPI adaptersAPI;

	private Database getDB() throws Exception {
		CloudantJavaApplication app = adaptersAPI.getJaxRsApplication(CloudantJavaApplication.class);
		if (app.db != null) {
			return app.db;
		}
		throw new Exception("Unable to connect to Cloudant DB, check the configuration.");
	}

	@GET
	@Produces("application/json")
	public Response getAllEntries() throws Exception {
		List<TunisianCity> entries = getDB().view("_all_docs").includeDocs(true).query(TunisianCity.class);
		return Response.ok(entries).build();
	}

	@GET
	@Path("/objectStorage")
	@Produces("application/json")
	public Response getObjectStorageAccess() throws Exception {
		CloudantJavaApplication app = adaptersAPI.getJaxRsApplication(CloudantJavaApplication.class);
		return Response.ok(app.getObjectStorageAccess()).build();
	}
}
