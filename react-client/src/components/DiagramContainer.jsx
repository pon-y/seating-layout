import React from 'react';
import { Chair, SchoolRoomTable, BanquetRoundTable, EightFtTable } from './Tables.jsx'

class DiagramContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
  
     }
  }
  render() {
    const {guests, layout, roomwidth, roomlength, guestsPerTable} = this.props.info;
    let roomWidthInches = roomwidth * 12;
    let roomLengthInches = roomlength * 12;

  //banquet layout
  //chairs have to be at least 36" away from wall 
    if(layout === 'banquet') {

      let numOfTables = guests/guestsPerTable; 
      let banquetLayout = [];
      let rowTables = (roomWidthInches - 72)/142; 
      let colTables = (roomLengthInches - 72)/142;

      let maxNumTables = rowTables * colTables;

      if (numOfTables > maxNumTables+ 1) {
        return (
        <div className="diagramContainer">
          <svg viewBox={`0 0 ${roomWidthInches} ${roomLengthInches}`} className="errorMessage">
          <text x="45" y="45" fill="#575366">Too Many Guests</text>
          <text x="45" y="90" fill="#575366">Please try a lower number or get a bigger meeting room</text>
            Too many guests for layout. 
            Please try a lower number or get a bigger meeting room.
          </svg>
        </div>
        )
      }

      let tableCounter = 0;

      for(let row = 36 + 57; row <= (roomWidthInches - 72) && tableCounter < numOfTables; row+= 142){
        for(let col = 36 + 57; col <= (roomLengthInches - 72) && tableCounter < numOfTables; col+= 142) { 
          banquetLayout.push(
            <BanquetRoundTable key={`table#: ${tableCounter} row: ${row} col: ${col}`} guests={guestsPerTable} transform={`translate(${row}, ${col})`} />
          );
          tableCounter++;
        }
      }
      return (
        <div className="diagramContainer">
    
          Room Size: {roomwidth} x {roomlength} Feet | Banquet Layout (72" Rounds) | {guests} Guests
    
          <svg viewBox={`0 0 ${roomWidthInches} ${roomLengthInches}`}> 
            {banquetLayout}
          </svg>

        </div>
      )

    }

  //theater layout

  if(layout === 'classroom') {

    return (
      <div className="diagramContainer">

        Room Size: {roomwidth} x {roomlength} Feet | Classroom Layout with Projector | {guests} Guests

        <svg viewBox={`0 0 ${roomWidthInches} ${roomLengthInches}`}> 
        <SchoolRoomTable transform={`translate(${50}, ${45})`} />
        <SchoolRoomTable transform={`translate(${150}, ${45})`} />
        </svg>

      </div>
    )  
  }

  //schoolroom layout 
  //each column of chairs is 8 chairs
  //chairs have to be at least 36" away from wall
    if(layout === 'theater') {
      let theaterLayout = [];
      let chairs = guests;
      let rowsChairs = (roomWidthInches - 90)/30; 
      let colsChairs = (roomLengthInches - 36)/21; 

      let maxNumChairs = rowsChairs * colsChairs;

      if (chairs > maxNumChairs ) {
        return (
        <div className="diagramContainer">
          <svg viewBox={`0 0 ${roomWidthInches} ${roomLengthInches}`} className="errorMessage">
            <text x="45" y="45" fill="#575366">Too Many Guests</text>
            <text x="45" y="90" fill="#575366">Please try a lower number or get a bigger meeting room</text>
            Too many guests for layout. 
            Please try a lower number or get a bigger meeting room.
          </svg>
        </div>
        )
      } 

      let chairCounter = 0;
 
      for(let row = 36 + 9; row <= (roomWidthInches - 72) && chairCounter < maxNumChairs && chairCounter < chairs; row+= 30){
        for(let col = 36 + 9 + 40; col <= (roomLengthInches - 36) && chairCounter < maxNumChairs && chairCounter < chairs; col+= 21) { 
          theaterLayout.push(<Chair key={`table#: ${chairCounter}`} transform={`translate(${row}, ${col})`} />);
          chairCounter++;
        }
      }

      return (
        <div className="diagramContainer">

          Room Size: {roomwidth} x {roomlength} Feet | Theater Style Layout | {guests} Guests

          <svg viewBox={`0 0 ${roomWidthInches} ${roomLengthInches}`}> 
          {theaterLayout}
          <EightFtTable transform={`translate(${roomWidthInches/2}, ${15})`}/>
          </svg>

        </div>
      )  
    }


  }
}
  

export default DiagramContainer;