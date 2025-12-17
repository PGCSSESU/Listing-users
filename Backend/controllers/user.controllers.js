const User = require("../models/users.models");

const getUsers = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const { q, Role, gender } = req.query;

  const filter = {};

  if (gender) filter.gender = gender;
  if (Role) filter.Role = Role;

  if (q) {
    filter.$or = [
      { first_name: new RegExp(q, "i") },
      { last_name: new RegExp(q, "i") },
    ];
  }

  const users = await User.find(filter)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await User.countDocuments(filter);

  res.json({
    data: users,
    nextPage: skip + users.length < total ? page + 1 : null,
  });
};

module.exports = { getUsers };
