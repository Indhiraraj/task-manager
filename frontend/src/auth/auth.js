export const login = async (name, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });
  
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
  
      const user = await response.json();
      localStorage.setItem("user", JSON.stringify(user.user));
      return user;
    } catch (error) {
      console.error("Login error:", error);
      return null;
    }
  };
  
  export const logout = () => {
    localStorage.removeItem("user");
  };
  
  export const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  