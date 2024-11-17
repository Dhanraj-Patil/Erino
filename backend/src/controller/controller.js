const router = require("express").Router();
const ContactService = require("../service/service");

router.post("/contacts", async (req, res) => {
  try {
    const data = req.body;
    await ContactService.create(data);
    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(500).json({ status: error });
  }
});

router.get("/contacts", async (req, res) => {
  try {
    res.json(await ContactService.getAllContacts());
  } catch (error) {
    res.status(500).json({ status: error });
  }
});

router.put("/contacts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await ContactService.update(id, data);
  } catch (error) {
    res.status(500).json({ status: error });
  }
});

router.delete("/contacts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await ContactService.deleteOne(id);
  } catch (error) {
    res.status(500).json({ status: error });
  }
});

module.exports = router;
