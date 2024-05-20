export const calcAge = (dob) => {
  const year = dob.split("-")[2];
  return new Date().getFullYear() - +year;
};
