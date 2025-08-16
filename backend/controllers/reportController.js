const Task = require("../models/Task");
const User = require("../models/User");
const excelJS = require("exceljs");

const exportTasksReport = async (req,res) => {
  try {
    
  } catch (error) {
    res
    .status(500).json({message: "Error exporting tasks", error: error.message});
  }
};

const exportUsersReport = async (req,res) => {};

module.exports ={exportTasksReport,exportUsersReport,};