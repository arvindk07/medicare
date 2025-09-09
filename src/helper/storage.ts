// Ensure you're setting the user info properly
export const setNeurowelUserInfo = (user_info: any) => {
  try {
    // Convert user_info to JSON and store it in localStorage
    localStorage.setItem("neurowel_user_info", JSON.stringify(user_info));
  } catch (error) {
    console.error("Error saving user info to localStorage:", error);
  }
};

// Safely get the token
export const getNeurowelToken = () => {
  try {
    // Retrieve and parse user info from localStorage
    let user_info = localStorage.getItem("neurowel_user_info");

    console.log("user_info==>", user_info);

    if (user_info) {
      user_info = JSON.parse(user_info);
      if (user_info && user_info) {
        return user_info; // Return the token if it exists
      } else {
        console.log("No access_token found in user info");
        return null; // No token found
      }
    } else {
      console.log("No user info found in localStorage");
      return null; // No user info found
    }
  } catch (error) {
    console.error("Error parsing user info from localStorage:", error);
    return null; // Return null if there's an error parsing
  }
};

export const clearNeurowelUserInfo = () => {
  localStorage.removeItem("neurowel_user_info");
};

export const getNeurowelLanguage = () => {
  const neurowel_lang: any = localStorage.getItem("neurowel_lang")
    ? localStorage.getItem("neurowel_lang")
    : "en";
  return neurowel_lang;
};
