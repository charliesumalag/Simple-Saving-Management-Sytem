import React, {useState} from 'react'
import styles from './savingManagement.module.css';
import Add from './add';
import Show from './showSavings';

const savingManagement = () => {
  const [selectedOption, setSelectedOption] = useState('add');

  const handleSavingsChange = (e) => {
    const { name, value } = e.target;
    setNewSavings((prev) => ({ ...prev, [name]: value }));
};
const handleSavingsSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('', newSavings, {
            withCredentials: true,
        });
        if (response.data.success) {
            setSavings([...savings, newSavings]);
            setNewSavings({ memberId: '', amount: '' });
        }
    } catch (err) {
        console.error('Error adding savings:', err);
    }
};
const handleOptionChange = (e) => {
  setSelectedOption(e.target.value);
};



  return (
    <section className={styles.savingsSection} onChange={handleOptionChange}>
      <h2 className={styles.header2}>Savings Management</h2>
      <select name="" id="" className={styles.select} required  defaultValue="">
        <option className={styles.option} value="" disabled>Select Actions</option>
        <option className={styles.option}value="add">Add Savings</option>
        <option className={styles.option}value="show">Show Savings</option>
      </select>
      { selectedOption === 'add' && <Add handleSavingsChange={handleSavingsChange} handleSavingsSubmit={handleSavingsSubmit} />}
      { selectedOption === 'show' && <Show handleSavingsChange={handleSavingsChange} handleSavingsSubmit={handleSavingsSubmit} />}
    </section>
  )
}

export default savingManagement
