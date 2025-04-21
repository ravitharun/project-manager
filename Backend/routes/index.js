var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var cors = require("cors");

var nodemailer = require('nodemailer');
require('dotenv').config();
console.log("Email User:", process.env.EMAIL_USER);
console.log("Email Pass:", process.env.EMAIL_PASS ? "Loaded" : "Not Loaded");
const SECRET_KEY = process.env.SECRET_KEY;

// Use CORS and JSON parsing globall
router.use(cors());

router.use(express.json());

const { ProjectModel, UserModel, ClientModel } = require("../bin/DATABASE.JS");

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});





const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Email validation regex

router.post("/Send", async (req, res) => {
  try {
    const { id, TechStack, email, PriorityChange, Budget, Description, StartDate, EndDate, Projecttite, CreatedAt, Status, UserEmail } = req.body;

    let newProject = new ProjectModel({
      id,
      TechStack: TechStack.split(","), // Convert string to array
      PriorityChange,
      Budget,
      Description,
      StartDate,
      email: email.split(","), // Convert string to array
      EndDate,
      Projecttite,
      CreatedAt,
      Status,
      UserEmail
    });

    // Save project to MongoDB
    await newProject.save();
    console.log("Project saved successfully!");

    // Validate emails and send emails
    let validEmails = newProject.email.filter(email => emailRegex.test(email));

    if (validEmails.length > 0) {
      // Send Emails to valid email addresses only
      for (let i = 0; i < validEmails.length; i++) {

        let mailOptions = {
          from: process.env.EMAIL_USER,
          to: validEmails[i],
          subject: newProject.Projecttite,
          text: newProject.Description,  // Plain text version (optional)
          html: `
            <p>${newProject.Description}</p>
            <a href="https://your-link.com" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                Click Here
            </a>
          `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Email error:", error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      }

      res.json({ message: "Emails sent successfully!" });
    } else {
      res.status(400).json({ message: "No valid emails found." });
    }

  } catch (err) {
    console.error("Error saving project:", err);
    res.status(500).json({ message: "Server Error" });
  }
});



// Get All Projects
router.get("/getProjects", async (req, res) => {
  try {
    const mail = req.query.Useremail;
    const projects = await ProjectModel.find({ UserEmail: mail }); // Filter by UserEmail

    if (projects.length === 0) 
    {
      res.json({ message: "No projects found" });
    }
    else {
      const updatedProjects = projects.map((data) => {
        const d = new Date(data.EndDate);
        const present = new Date();
        const dateStr = d.toLocaleDateString();
        const nowDateStr = present.toLocaleDateString();
        if (dateStr === nowDateStr) {
          console.log(data)
          for (let i = 0; i < data.email.length; i++) {
            let mailOptions = {
              from: process.env.EMAIL_USER,
              to: data.email[i],  // Ensure this contains a valid email address
              subject: `⏳ Last Date Reminder: ${data.Projecttite}`, // More engaging subject line
              text: `Hello Manager, TODAY IS THE LAST DATE FOR THE PROJECT: ${data.Projecttite}. Description: ${data.Description}`,  // Plain text fallback
              html: `data
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
                    <div style="background-color: #007bff; color: white; padding: 15px; text-align: center; border-radius: 10px 10px 0 0; font-size: 20px; font-weight: bold;">
                        ⚠️ Project Deadline Reminder
                    </div>
                    <div style="padding: 20px; color: #333;">
                        <p><b>Hello Manager,</b></p>
                        <p>We want to remind you that <b>today</b> is the last date for the project: <b>${data.Projecttite}</b>.</p>
                        <p style="font-style: italic;">${data.Description}</p>
                        <p>Please take the necessary actions before the deadline.</p>
                        <a href="https://your-link.com" style="display: inline-block; background-color: #007bff; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 15px;">
                            View Project Details
                        </a>
                    </div>
                    <div style="padding: 15px; text-align: center; font-size: 14px; color: #555;">
                        <p>Thank you,<br><b>Your Company Team</b></p>
                    </div>
                </div>
            `,
            };


            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error("Email error:", error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });

          }

          return { ...data.toObject(), status: "Last Date" }; // Convert Mongoose object to plain object


        }
        else {
          let diffInMs = d.getTime() - present.getTime();
          let diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24)); // Convert to days
          return { ...data.toObject(), daysLeft: diffInDays }; // Convert Mongoose object to plain object
        }
      });

      res.json(projects); // Send modified projects list
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});






// Edit Project by ID
router.post("/Edit/:id", async (req, res) => {
  try {
    const { id } = req.params;  // Extract the 'id' from req.params
    const search = await ProjectModel.findById({ _id: ObjectId(id) });  // Use the 'id' in ObjectId

    if (!search) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(search);  // Return the found project

    console.log(search)
    res.status(200).json("Editing");
  } catch (err) {
    res.status(500).json("Something went wrong");
  }
});




// Delete a Project
router.delete("/delete/:id", async (req, res) => {
  try {
    const Delete = req.params.id;
    const Deletedid = await ProjectModel.findOneAndDelete({ _id: Delete });

    if (!Deletedid) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json("Project deleted successfully");
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json("Something went wrong");
  }
});



// Sign the user creating the new user


router.post("/Sign", async (req, res) => {
  try {
    const { name, useremail, userpassword } = req.body;

    if (!name || !useremail || !userpassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Hash password before saving to DB
    const hashedPassword = await bcrypt.hash(userpassword, 10);

    const newUser = new UserModel({
      name,
      useremail,
      userpassword: hashedPassword, // Store hashed password
    });

    console.log("Saving user:", newUser);
    await newUser.save(); // Save to MongoDB

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id, email: newUser.useremail }, SECRET_KEY, { expiresIn: "1h" });

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
      token
    });

  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Login the user and checking the user is present or not and generating the token 
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ useremail: email });

    if (!user) return res.status(404).json({ message: "User not found" });
    // console.log(user.useremail)

    const isPasswordValid = await bcrypt.compare(password, user.userpassword);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid password" });

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, email: user.useremail }, process.env.SECRET_KEY, { expiresIn: "1h" });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Successful Login to WebFlow Manager",
      text: `Dear ${email},\n\nYou have successfully logged into WebFlow Manager. If this wasn't you, please reset your password immediately.`,
      html: `
        <p>Dear ${email},</p>
        <p>You have successfully logged into <strong>WebFlow Manager</strong>. If this wasn't you, please reset your password immediately.</p>
        <a href="http://localhost:5173/Reset" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Reset Password
        </a>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email error:", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).json({ message: "Login successful", token, Email: user.useremail });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});




// Submitting The Client Data To Database

router.post("/submit-client-data", async (req, res) => {
  const { name, email, phone, company, CompanyImgUrl } = req.body;
  let ClientDetails = new ClientModel({ name, email, phone, company, CompanyImgUrl })
  await ClientDetails.save();
  res.status(200).json({ message: "Success" });
});



// Get all client from database

router.get("/Getallclient", async (req, res) => {
  try {
    const clients = await ClientModel.find();

    if (!clients || clients.length === 0) {
      return res.status(404).json({ message: "No clients found" });
    }

    console.log("Fetched Clients:", clients);
    res.status(200).json(clients); // Send array directly
  } catch (err) {
    console.error("Error fetching clients:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});





















// login checking 


router.post("/login", async (req, res) => {
  try {
    const { email, password, getid } = req.body;

  } catch (error) {
    res.status(500).json({ message: "SOME THING WENT WRONG" })
  }
})

module.exports = router;
