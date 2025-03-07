export const copyToClipboard = async (password: string) => {
  if (password) {
    try {
      await navigator.clipboard.writeText(password);
    } catch (err) {
      console.error("Failed to copy password: ", err);
    }
  }
};
