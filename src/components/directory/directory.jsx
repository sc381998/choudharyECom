import React from 'react';
import { connect } from 'react-redux';

import MenuItem from '../menu-item/menu-item';
import { createStructuredSelector } from "reselect";
import { selectDirectorySections } from "../../redux/directory/selectors";
import './directory.scss';

class Directory extends React.Component {

  render() {
    return (
      <div className='directory-menu'>
        {this.props.sections.map(({ id, ...otherSectionProps }) => (
          <MenuItem key={id} {...otherSectionProps} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);