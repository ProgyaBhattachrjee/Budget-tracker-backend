const ExpenseSchema = require('../Models/expense');
const { param } = require('../routes/transaction');
exports.addExpense = async (req, res) => {
    try {
      const { title, amount, date, category, description } = req.body;
      if (!title || !amount || !date || !category || !description) {
        return res.status(400).json({ message: "Please fill all required fields." });
      }
      const expense = new ExpenseSchema({
        title,
        amount,
        date,
        category,
        description
      });
      await expense.save();
      return res.status(200).json({ message: "expense added successfully." });
    } catch (error) {
      return res.status(500).json({ message: "Server error.", error: error.message });
    }
  };

  exports.getExpense = async(req,res)=>{
    try {
        const expense = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(expense)
    } catch (error) {
        return res.status(500).json({ message: "Server error.", error: error.message });
    }
  }

  
  exports.deleteExpense = async (req, res) => {
    const { title } = req.params;  // Get the title from request parameters
    console.log(req.params);       // Log to verify the received title

    try {
        // Find and delete the expense document based on the title
        const expense = await ExpenseSchema.findOneAndDelete({ title });
        
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (err) {
        console.error("Error during expense deletion:", err.message);
        res.status(500).json({ message: "Server error.", error: err.message });
    }
};

  