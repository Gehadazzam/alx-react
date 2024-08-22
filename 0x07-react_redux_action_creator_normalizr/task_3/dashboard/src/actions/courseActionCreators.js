export const selectCourse = (index) => {
  return {
    type: "SELECT_COURSE",
    index,
  };
};

export const unSelectCourse = (index) => {
  return {
    type: "UNSELECT_COURSE",
    index,
  };
};
