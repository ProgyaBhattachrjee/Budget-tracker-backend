const IncomeSchema = require('../Models/income');
const { param } = require('../routes/transaction');
exports.addIncome = async (req, res) => {
    try {
      const { title, amount, date, category, description } = req.body;
      if (!title || !amount || !date || !category || !description) {
        return res.status(400).json({ message: "Please fill all required fields." });
      }
      const income = new IncomeSchema({
        title,
        amount,
        date,
        category,
        description
      });
      await income.save();
      return res.status(200).json({ message: "Income added successfully." });
    } catch (error) {
      return res.status(500).json({ message: "Server error.", error: error.message });
    }
  };

  exports.getIncome = async(req,res)=>{
    try {
        const income = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(income)
    } catch (error) {
        return res.status(500).json({ message: "Server error.", error: error.message });
    }
  }

  
  exports.deleteIncome = async (req, res) => {
    const { title } = req.params;  // Get the title from request parameters
    console.log(req.params);       // Log to verify the received title

    try {
        // Find and delete the income document based on the title
        const income = await IncomeSchema.findOneAndDelete({ title });
        
        if (!income) {
            return res.status(404).json({ message: "Income not found" });
        }
        
        res.status(200).json({ message: "Income deleted successfully" });
    } catch (err) {
        console.error("Error during income deletion:", err.message);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

  