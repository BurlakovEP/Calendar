import React from 'react';
import './Header.scss';

function Header(props) {
  let { month, year } = props.date;
  let setDate = props.setDate;
  return (
    <header className="header">
      <button className="header__control" onClick={setDate.bind(this, 'decrease')}>
        &#9668;
      </button>
      <div className="header__title">{`${month} ${year}`}</div>
      <button className="header__control" onClick={setDate.bind(this, 'increase')}>
        &#9658;
      </button>
    </header>
  );
}

export default Header;
