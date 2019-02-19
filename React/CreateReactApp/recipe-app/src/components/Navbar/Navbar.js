import React from 'react';
import {Component} from 'react';
import './Navbar.css';

class Navbar extends Component {

  static defaultProps = {
      title: 'Recipee App',
      links: ['New Recipe','Home','About','Contact us'],
  };

  render() {

    const {title, links} = this.props;

    const navbarLinks = links.map((link, index) => (<a href="#" className="navLink" key={index}>{link}</a>));

    return (
      <nav>
        <a href="#" className="appName">{title}</a>
        <div className="navbarLinks">
          {navbarLinks}
        </div>
      </nav>

    )
  }
}

export default Navbar;
