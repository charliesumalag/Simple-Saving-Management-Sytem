import React,{useEffect, useState} from 'react'
import styles from './savingManagement.module.css';
import axios from 'axios';

const add = (props) => {
  const [members, setMembers] = useState([]); // State for members list
  const [newSavings, setNewSavings] = useState({
    memberName: "",
    amount: "",
  }); // State for savings input

  // Fetch members from the API when the component mounts
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getMembers.php", {
          withCredentials: true, // Allows cookies and credentials to be sent
        });
        if (response.data.success) {
          setMembers(response.data.members); // Update the state with the members list
        } else {
          console.error("Error fetching members:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  // Handle input changes for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSavings((prev) => ({
      ...prev,
      [name]: value,
    }));
    props.handleSavingsChange(e); // Notify parent component
  };


  return (
    <form onSubmit={props.handleSavingsSubmit} className={styles.formAdd}>
      <select
        name="memberName"
        value={newSavings.memberName}
        onChange={handleInputChange}
        className={styles.memSelect}
        required
        >
        <option value="">Select Member</option>
        {members.map((member) => (
          <option className={styles.memList} key={member.id} value={member.first_name}>
            {member.first_name}
          </option>
        ))}
      </select>
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={newSavings.amount}
        onChange={props.handleSavingsChange}
        className={styles.inputAdd}
      />
    <button className={styles.Btn}>Add</button>
    </form>
  )
}

export default add
