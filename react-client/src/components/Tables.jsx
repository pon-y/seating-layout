import React from 'react';

/*
These functions can only be called from within SVG tags or inside each other
They will render a single table and the chairs associated it

Functions as stamps centered on (0, 0). 

Transformed via props when called:

ex: 
 <SchoolRoomTable transform={`translate(${45}, ${45})`} />

Standard units: inches
>chair: A standard 18in X 18in chair assumed 
*/

const Chair = (props) => (
    <circle {...props} cx="0" cy="0" r="9" />
)

const EightFtTable = (props) => (
  <rect {...props} x='-48' y='0' rx="2" ry="2" width={96} height={30} />
)
const SeventyTwoInchRound = (props) => (
  <circle r="36" />

)

function dynamicRoundTable (guests) {
  //will render guests number of chairs spread evenly for a 72" Round table
    let chairArray = [];
    let radius = 48;
    let degrees = 360/guests;
    for(let i = 0; i < 360; i += degrees) {
      chairArray.push(<circle key={i} cx={48 * Math.sin((i * (Math.PI/180)))} cy={48 * Math.cos((i * (Math.PI/180)))} r="9" />)
    }
      return chairArray;
  }

// Tables:


const BanquetRoundTable = (props) => (
  //72" table with 10 guests per table
  //TODO: Refactor to make dynamic based on number of guests per table
 

      <g {...props}>

        {/* chairs */}
        {dynamicRoundTable(props.guests)}

        {/* table */}
        <circle r="36" />
      </g>

)
const SchoolRoomTable = (props) => (
  //8 ft table thats seats three on a single side
     <g {...props}>
     
        {/* each circle element is a person sitting around the table */}
        {/* difference of 11 on the x coordinate per circle */}

        <circle cx='-36' cy='-12' r="9" />
        <circle cx='0'  cy='-12' r="9" />
        <circle cx='36' cy='-12' r="9" />
 
        {/* table */}
        <rect x='-48' y='0' width={96} height={30} />
      </g>

)

export { BanquetRoundTable, SchoolRoomTable, Chair, EightFtTable };

