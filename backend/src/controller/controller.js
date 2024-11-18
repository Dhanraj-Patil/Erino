const router = require("express").Router();
const ContactService = require("../service/service");

router.post("/contacts", async (req, res) => {
  try {
    const data = req.body;
    await ContactService.create(data);
    res.status(200).json({ status: "OK" });
  } catch (error) {
    if (error.message == "11000") {
      res.status(200).json({
        status: "BAD",
        message: "Email or phone number already used.",
      });
    } else
      res.status(500).json({ status: "BAD", message: "Internal Server Error" });
  }
});

router.get("/contacts", async (req, res) => {
  try {
    const data = await ContactService.getAllContacts();
    console.log(data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ status: error });
  }
});

router.put("/contacts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    console.log(id);
    await ContactService.update(id, data);
    res.status(200).json({ status: "OK" });
  } catch (error) {
    if (error.message == "11000") {
      res.status(200).json({
        status: "BAD",
        message: "Phone number already used.",
      });
    } else
      res.status(500).json({ status: "BAD", message: "Internal Server Error" });
  }
});

router.delete("/contacts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    await ContactService.deleteOne(id);
    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(500).json({ status: error });
  }
});

module.exports = router;
