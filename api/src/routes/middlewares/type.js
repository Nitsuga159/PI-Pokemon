const { Router } = require("express"),
  router = Router(),
  { getTypes } = require("../middlewares/models-functions/typeFunc.js");

router.get("/", async (req, res) => {
  try {
    res.status(200).json(await getTypes());
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

module.exports = router;
