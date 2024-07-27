export function getFullYear() {
  return new Date().getFullYear();
}

// Function to get the footer text based on the isIndex boolean
export function getFooterCopy(isIndex) {
  return isIndex ? "Holberton School" : "Holberton School main dashboard";
}
