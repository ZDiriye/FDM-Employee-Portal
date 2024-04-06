import React, { useState } from 'react';
import ViewAccountForm from './viewAccountForm';
import CreateAccountForm from './createAccountForm';
import NavigationBar from '../NavBar';
function ManageAccountsForm() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <NavigationBar/>
      <div>
        <button onClick={() => handleOptionChange('create')}>Add Account</button>
        <button onClick={() => handleOptionChange('view')}>Edit/Delete Account</button>
      
      </div>
      <div>
        {selectedOption === 'create' && <CreateAccountForm/>}
        {selectedOption === 'view' && <ViewAccountForm />}
      
      </div>
    </div>
  );
}

export default ManageAccountsForm;

