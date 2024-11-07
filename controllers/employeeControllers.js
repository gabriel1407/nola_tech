const Employee = require("../models/user");

exports.createEmployee = async (req, res) => {
  try {
      const employee = new Employee(req.body);
      await employee.save();
      res.status(201).json(employee);
  } catch (error) {
      res.status(500).json({ message: "Error creating employee", error });
  }
};

exports.getEmployees = async (req, res) => {
  try {
      const employees = await Employee.find().select(
        "_id username first_name last_name role position age email phone departament"
      );
      res.json(employees);
  } catch (error) {
      res.status(500).json({ message: "Error retrieving employees", error });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) return res.status(404).json({ message: "Employee not found" });
      res.json(employee);
  } catch (error) {
      res.status(500).json({ message: "Error retrieving employee", error });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
      const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!employee) return res.status(404).json({ message: "Employee not found" });
      res.json(employee);
  } catch (error) {
      res.status(500).json({ message: "Error updating employee", error });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
      const employee = await Employee.findByIdAndDelete(req.params.id);
      if (!employee) return res.status(404).json({ message: "Employee not found" });
      res.json({ message: "Employee deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: "Error deleting employee", error });
  }
};