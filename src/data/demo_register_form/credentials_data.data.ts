interface ICredentials {
    username: string;
    password: string;
  }
  
  enum NOTIFICATIONS {
    REGISTER_SUCCESS = "Successfully registered! Please, click Back to return on login page",
    INVALID_PASSWORD = "Invalid credentials",
    INVALID_USERNAME = "Invalid credentials",
    EMPTY_CREDENTIALS = "Credentials are required",
    SHORT_PASSWORD = "Password should contain at least 8 characters",
    SHORT_USERNAME = "Username should contain at least 3 characters",
    EMPTY_USERNAME = "Username is required",
    EMPTY_PASSWORD = "Password is required",
    SPACES_USERNAME = "Prefix and postfix spaces are not allowed is username",
    LONG_USERNAME = "Username must be at most 40 characters",
    LONG_PASSWORD = "Password must be at most 20 characters",
    USERNAME_EXISTS = "Username is in use",
    NO_LOWER_CHARACTERS_PASSWORD = "Password should contain at least one character in lower case",
    
}

  interface IUserData {
    title: string;
    credentials: ICredentials;
    message: NOTIFICATIONS;
  }

  const invalidCredentialsData: IUserData[] = [
    { 
      title: "Register with empty username",
      credentials: {username: "", password: "Ulyana12345678 !@#$"}, 
      message: NOTIFICATIONS.EMPTY_USERNAME, 
    },
    { 
        title: "Spaces at the start in the Username",
        credentials: {username: "  John", password: "Ulyana12345678 !@#$"}, 
        message: NOTIFICATIONS.SPACES_USERNAME,  
    },
    { 
        title: "Spaces at the end in the Username",
        credentials: {username: "John    ", password: "Ulyana12345678 !@#$"}, 
        message: NOTIFICATIONS.SPACES_USERNAME,
    },
    { 
        title: "Username is less than MIN",
        credentials: {username: "ab", password: "Ulyana12345678 !@#$"}, 
        message: NOTIFICATIONS.SHORT_USERNAME,
    },
    // { 
    //     title: "Username is more than MAX",
    //     credentials: {username: "a".repeat(41), password: "Ulyana12345678 !@#$"}, 
    //     message: NOTIFICATIONS.LONG_USERNAME,
    // },
    { 
        title: "Register without Password",
        credentials: {username: "ValidUserName", password: ""}, 
        message: NOTIFICATIONS.EMPTY_PASSWORD,
    },
    { 
        title: "Register with empty Password",
        credentials: {username: "ValidUserName", password: ""}, 
        message: NOTIFICATIONS.EMPTY_PASSWORD,
    },
    { 
        title: "Password is less than MIN",
        credentials: {username: "ValidUserName", password: "shortP1"}, 
        message: NOTIFICATIONS.SHORT_PASSWORD,
    },
    // { 
    //     title: "Password is more than MAX",
    //     credentials: {username: "ValidUserName", password: "REALLYverylongPasswordA12345678"}, 
    //     message: NOTIFICATIONS.LONG_PASSWORD, 
    // },
    { 
        title: "Password with uppercase only",
        credentials: {username: "ValidUserName", password: "ONLYUPPERCASE"}, 
        message: NOTIFICATIONS.NO_LOWER_CHARACTERS_PASSWORD, 
    },
  ];

  export default invalidCredentialsData;