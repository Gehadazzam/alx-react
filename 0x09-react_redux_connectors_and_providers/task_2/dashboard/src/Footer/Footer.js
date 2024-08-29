import React from "react";
import { getFullYear, getFooterCopy } from "../utils/utils";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    user: state.ui.user,
  };
};

function Footer({ user }) {
  return (
    <footer>
      {user.isLoggedIn && (
        <p>
          <a href="#">Contact us</a>
        </p>
      )}
      <p>
        Copyright {getFullYear()} - {getFooterCopy()}
      </p>
    </footer>
  );
}

export default connect(mapStateToProps)(Footer);
