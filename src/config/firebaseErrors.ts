export const handleFirebaseError = (error: string) => {
  switch (error) {
    case "auth/invalid-email":
      return "Invalid email";
    case "auth/missing-password":
      return "Please enter a password";
    case "auth/invalid-credential":
      return "Incorrect email or password";
    case "auth/weak-password":
      return "Password should be at least 6 characters";
    default:
      return "An error occurred. Please try again";
  }
};
