import React, { useEffect } from "react";
import CourseListRow from "./CourseListRow";
import CourseShape from "./CourseShape";
import PropTypes from "prop-types";
import { css, StyleSheet } from "aphrodite";
import { connect } from "react-redux";
import {
  fetchCourses,
  selectCourse,
  unSelectCourse,
} from "../actions/courseActionCreators";
import { allCoursesSelector } from "../selectors/courseSelector";

const styles = StyleSheet.create({
  table: {
    border: "1px solid #cccccc",
    width: "90%",
    margin: "30px auto auto",
    borderCollapse: "collapse",
  },
});

function CourseList({
  listCourses,
  fetchCourses,
  selectCourse,
  unSelectCourse,
}) {
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const onChangeRow = (id, checked) => {
    if (checked) {
      selectCourse(id);
    } else {
      unSelectCourse(id);
    }
  };

  return (
    <table id="CourseList" className={css(styles.table)}>
      <thead>
        <CourseListRow textFirstCell="Available courses" isHeader={true} />
        <CourseListRow
          textFirstCell="Course name"
          textSecondCell="Credit"
          isHeader={true}
        />
      </thead>
      <tbody>
        {listCourses.length > 0 ? (
          listCourses.map(({ id, name, credit, isSelected }) => (
            <CourseListRow
              key={id}
              textFirstCell={name}
              textSecondCell={credit}
              isChecked={isSelected}
              onChangeRow={onChangeRow}
            />
          ))
        ) : (
          <CourseListRow textFirstCell="No course available yet" />
        )}
      </tbody>
    </table>
  );
}

CourseList.defaultProps = {
  listCourses: [],
};

CourseList.propTypes = {
  listCourses: PropTypes.arrayOf(CourseShape),
  fetchCourses: PropTypes.func.isRequired,
  selectCourse: PropTypes.func.isRequired,
  unSelectCourse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  listCourses: allCoursesSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCourses: () => dispatch(fetchCourses()),
  selectCourse: (id) => dispatch(selectCourse(id)),
  unSelectCourse: (id) => dispatch(unSelectCourse(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
