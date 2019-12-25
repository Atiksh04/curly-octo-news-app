import {postContent,getContent,deleteContent} from '../controllers/content.js'
import {postAdmin,verify,getAdmin,autoLogin} from '../controllers/loginController.js'
 export const routes= (app)=>{
	app.route("/api/content")	// For Getting and posting content under Admin rights
		.get(getContent)	
	app.route("/api/admin") 	//For registering Admin 
		.post(postAdmin);
	app.route("/api/adminLogin") //For logging Admin User
		.post(getAdmin)
		.get(autoLogin);
	app.route("/api/contentdelete")
		.post(verify,deleteContent)
}

