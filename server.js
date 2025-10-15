const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://student:Test1234@cluster0.rzfaxdk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));


const feedbackSchema = new mongoose.Schema({
  name: String,
  comment: String,
  rating: String,
});


const Feedback = mongoose.model("Feedback", feedbackSchema);


app.post("/feedback", async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.status(201).json({ message: "Feedback saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving feedback" });
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
