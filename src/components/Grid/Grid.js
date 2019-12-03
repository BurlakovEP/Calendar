import React from "react";
import "./Grid.scss";

export default class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      daysOfWeek: this.getDaysOfWeek()
    };
  }

  getDaysOfWeek = () => {
    let days = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
    let arr = [];
    for (let i = 0; i < days.length; i++) {
      let obj = {
        string: days[i],
        number: i + 1,
        className: "grid__cell grid__cell_head"
      };

      if (i === days.length - 1) obj.number = 0;
      arr[i] = obj;
    }
    return arr;
  };

  render() {
    let days = this.props.date.days;
    return (
      <table className="grid">
        <thead className="grid__head">
          <tr className="grid__row grid__row_head">
            {this.state.daysOfWeek.map((cell, index) => (
              <td className={cell.className} key={index}>
                {cell.string}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className="grid__body">
          {days.map((row, index) => (
            <tr className="grid__row" key={index}>
              {row.map((cell, index) => (
                <td className={cell.className} key={index}>
                  {cell.number}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
