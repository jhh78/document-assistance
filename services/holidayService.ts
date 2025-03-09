export const getHolidays = async (countryCode: string, year: number) => {
  const response = await fetch(
    `https://date.nager.at/api/v3/publicholidays/${year}/${countryCode}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch holidays");
  }
  return response.json();
};
