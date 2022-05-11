import React from "react";

const _prepareData = (skills) => {
  // korak 1
  let obj = {};
  let maxNumber = 1;
  skills.forEach((item, index) => {
    let number = 0;
    if (obj[item.year]) {
      number = obj[item.year] + 1;
    } else {
      number = 1;
    }
    obj[item.year] = number;
    if (number > maxNumber) {
      maxNumber = number;
    }
  });
  console.log("korak 1", obj);
  // korak 2 prevaranje u procente
  let obj2 = {};
  let years = Object.keys(obj);
  years.forEach((year) => {
    let number = obj[year];
    let percent = number / maxNumber;
    obj2[year] = {
      year: year,
      number: number,
      percent: percent,
    };
  });
  console.log("korak 2", obj2);
  // korak 3 pretvaranje drugog koraka u niz.
  let arr = [];
  years.forEach((year) => {
    arr.push({
      ...obj2[year],
    });
  });
  console.log("korak 3", arr);
  return arr;
};

const SkillsChart = (props) => {
  const data = _prepareData(props.skills); // preiprema podata za grafik

  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Number of skills aquired</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.year}</td>
                  <td className="num-of-skill">
                    <div
                      className="chart-rectangle"
                      style={{
                        display: "inline-block",
                        height: "25px",
                        width: item.percent * 500 + "px",
                      }}
                    ></div>
                    <span>{item.number}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        { }
      </div>
    </>
  );
};

export default SkillsChart;
