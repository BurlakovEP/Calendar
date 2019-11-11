import React from 'react';
import './Calendar.scss';
import Header from './components/Header/Header';
import Grid from './components/Grid/Grid';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthLength = this.getMonthLength(year, month);
    const day = this.getDay(year, month);
    const today = date.getDate();

    this.state = {
      year: year,
      month: this.getMonth(month),
      monthNumber: month,
      monthLength: monthLength,
      days: this.getDays(day, monthLength, today),
      day: day,
      today: today,
    };
  }

  getMonth = (month) => {
    let months = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ];
    let obj = { ...months };
    return obj[month];
  };

  getMonthLength = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  getDays = (day, length, today) => {
    let days = [...Array(length + 1).keys()];
    let arr = [];
    let count = 1;

    if (day === 1) {
      days = days.filter((item) => item !== 0);
    } else {
      if (day === 0) day = 7;

      days = days.filter((item) => item !== 0);
    }

    let empty = new Array(day).fill('');
    days = [...empty, ...days];

    for (let i = 0; i < 6; i++) {
      arr[i] = [];
      for (let j = 0; j < 7; j++) {
        let obj = {
          className: 'grid__cell',
          number: days[count++],
          id: j,
        };

        if (obj.number === undefined) {
          obj.number = '';
        }

        if (obj.number === today) {
          obj.className += ' grid__cell_current';
        }

        arr[i][j] = obj;
      }
    }
    return arr;
  };

  getDay = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  setDate = (action) => {
    const date = new Date();
    let { year, monthNumber, monthLength, days, day, today } = this.state;

    if (action === 'increase') {
      if (monthNumber === 11) {
        monthNumber = 0;
        year++;
      } else {
        monthNumber++;
      }
    }

    if (action === 'decrease') {
      if (monthNumber === 0) {
        monthNumber = 11;
        year--;
      } else {
        monthNumber--;
      }
    }

    day = this.getDay(year, monthNumber);
    monthLength = this.getMonthLength(year, monthNumber);
    days = this.getDays(day, monthLength);

    this.setState({
      year: year,
      month: this.getMonth(monthNumber),
      monthNumber: monthNumber,
      monthLength: monthLength,
      days: days,
      day: day,
    });

    if (monthNumber === date.getMonth() && year === date.getFullYear()) {
      this.setState({
        days: this.getDays(day, monthLength, today),
      });
    }
  };

  render() {
    return (
      <div className="calendar">
        <Header date={this.state} setDate={this.setDate} />
        <Grid date={this.state} />
      </div>
    );
  }
}
