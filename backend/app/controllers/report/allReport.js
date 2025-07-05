const sequelize = require('../../../sequelize/config/sequelize');

const allReport = async(req, res)=>{
  try {
    const { query } = req.body; // Assuming you are passing the query in the request body
  
    let result;
  
    // Check if the query starts with 'SELECT' to ensure it is a select query
    if (!query.toLowerCase().startsWith('select')) {
      return res.status(400).json({ success: false, message: 'Only SELECT queries are allowed' });
    }

    // Extract the table name from the query
    const tableNameMatch = query.match(/FROM\s+(\w+)/i);
    if (!tableNameMatch || !tableNameMatch[1]) {
      return res.status(400).json({ success: false, message: 'Invalid query. Could not determine the table name' });
    }

    const tableName = tableNameMatch[1];

    // Check if the table is supported
    const supportedTables = ['cities','ClientNotes', 'Clients', 'ContactLabels','ContactNotes','Contacts','countries','states','Users']; // Add your supported table names here
    if (!supportedTables.includes(tableName)) {
      return res.status(400).json({ success: false, message: 'Unsupported table' });
    }

    // Perform the left join query
    result = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
      raw: true, // Retrieve raw data instead of Sequelize model instances
    });
    return res.status(200).send({ success: true, message: 'Success', data: result });
  }catch(error){
    return res.status(500).send({ success:false, message:"Internal Server Error", error:error})
  }
}

module.exports = allReport;