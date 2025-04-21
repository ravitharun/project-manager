// Requiring the mongoose
const mongoose = require("mongoose");

// mongoose connection setup
mongoose.connect("mongodb://localhost:27017/ProjectManagment", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));
// ProjectSchema
const ProjectSchema = new mongoose.Schema({
  Projecttite: { type: String, default: "some text " },
  Description: { type: String },
  TechStack: [{ type: String }], // Array of technologies
  email: [{ type: String, require: true }], // Array of technologies
  StartDate: { type: Date },
  EndDate: { type: Date },
  PriorityChange: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  Budget: { type: Number },
  Status: { type: String,default:"Pending" },
  UserEmail:{type:String, require:true}, // Array of technologies
});
// user Schema
const user = new mongoose.Schema({
  name: { type: String, required: true },  
  useremail: { type: String, required: true },  
  userpassword: { type: String, required: true }
});

// client data of that project
const Client = new mongoose.Schema({
  name: { type: String, required: true },  
  email: { type: String, required: true },  
  phone: { type: String, required: true },  
  company: { type: String, required: true },
  CompanyImgUrl: { type: String, required: true }
});

// creating model
const ProjectModel = mongoose.model("Project", ProjectSchema);
const UserModel = mongoose.model("User", user); // ✅ Corrected Name
const ClientModel = mongoose.model("Client", Client); // ✅ Corrected Name

// exporting the model in the code
module.exports = { ProjectModel, UserModel,ClientModel }; // ✅ Corrected Export

