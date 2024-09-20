import DataSet from '../DB_data_set.json'
import Data from "../Model/pattern.model"

const AddInitialData = async () => {
    try {
        const existingData = await Data.find();
        if (existingData.length === 0) {
            await Data.insertMany(DataSet);
            console.log('Initial data added to the database');
        } else {
            console.log('Initial data already exists in the database, skipping insertion');
        }
    } catch (error) {
        console.error('Error adding data to the database:', error);
        throw error;
    }
}

export default AddInitialData;