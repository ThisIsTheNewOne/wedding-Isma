const fetchPassword = async (): Promise<string> => {
    try {
      // Simulate a delay of 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));

      //   const data = await response.json();
      //   return data.password;
      
      const correctPassword = '12345';
      return correctPassword;
    } catch (error) {
      console.error('Error fetching password:', error);
      return '';  // Return an empty string or handle errors gracefully
    }
  };
  
  export default fetchPassword;