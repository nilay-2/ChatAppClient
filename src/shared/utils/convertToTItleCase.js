export const convertToTitleCase = (name) => {
  return (
    name.split("")[0].toUpperCase() + name.slice(1, name.length).toLowerCase()
  );
};
