interface ICredentials {
    username: string;
    password: string;
  }
  
  interface IUserData {
    title: string;
    credentials: ICredentials;
    successMessage: string;
  }
  
  const successMessageText = "Successfully registered! Please, click Back to return on login page";
  
  const validTestData: IUserData[] = [
    { 
      credentials: {username: "Andrei12345678 !@#$", password: "Andrei12345678 !@#$"}, 
      successMessage: successMessageText, 
      title: "Register with smoke credentials",
    },
    { 
      credentials: {username: "Ann", password: "123456Aa"}, 
      successMessage: successMessageText, 
      title: "Register with min valid credentials", 
    },
    { 
      credentials: {username: "Andrei12345678 !@#$aaaaaaaaaaaaaaaaaaaaa", password: "!@#$aaaaaaaaaaaaaaaa"}, 
      successMessage: successMessageText, 
      title: "Register with max valid credentials", 
    }
  ];

  export default validTestData;