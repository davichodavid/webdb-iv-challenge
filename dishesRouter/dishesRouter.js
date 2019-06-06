const router = require("express").Router();
const knex = require("knex");
const knexConfig = require("../knexfile");
const database = knex(knexConfig.development);

router.get("/", (req, res) => {
  database("dishes")
    .then(dish => res.status(200).json(dish))
    .catch(err => res.status(500).json({ success: false, err }));
});

router.get("/:id", (req, res) => {
  database("dishes")
    .where({ id: req.params.id })
    .then(dish => {
      if (cohort) {
        res.status(200).json(dish);
      } else {
        res.status(404).json({ message: "That cohort not there brah" });
      }
    })
    .catch(err => res.status(500).json(err));
});

router.get("/recipes", (req, res) => {
  database("recipes")
    .then(recipe => {
      res.status(200).json(recipe);
    })
    .catch(err => res.status(500).json(err));
});

router.post("/", (req, res) => {
  database("dishes")
    .insert(req.body, "id")
    .then(ids => res.status(201).json(ids))
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

router.put("/:id", (req, res) => {
  database("dishes")
    .where({ id: req.params.id })
    .update(req.body)
    .then(dishesUpdated => {
      if (dishesUpdated > 0) {
        res.status(202).json(dishesUpdated);
      } else {
        res.status(404).json({ message: "Wow, you dun goofed again!" });
      }
    })
    .catch(err => res.status(500).json({ success: false, err }));
});

router.delete("/:id", (req, res) => {
  database("dishes")
    .where({ id: req.params.id })
    .del()
    .then(dishDeleted => {
      if (dishDeleted > 0) {
        res.status(204).json(dishDeleted);
      } else {
        res
          .status(404)
          .json({ message: "Welp, can't even delete something...sad" });
      }
    })
    .catch(err => res.status(500).json({ success: false, err }));
});

module.exports = router;
