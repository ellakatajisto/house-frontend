import React, { useEffect } from "react";
import { useState, useRef } from "react";
import Cherry from "./assets/cherry.svg";
import Lemon from "./assets/lemon.svg";
import Orange from "./assets/orange.svg";
import Watermelon from "./assets/watermelon.svg";
import Loading from "./assets/loading.svg";
import "./SlotMachine.css";

let newIcons;

export function SlotMachine() {

  // for finding the button that should move randomly
  const ref = useRef(null);

  // https://coursesweb.net/javascript/moving-html-element-random-direction
  // determine whether the button moves or becomes unclicable
  useEffect(() => {
    let button = document.getElementById("cash-button");
    // console.log("button: ", button);

    let num = Math.random();
    if (num <= 0.5) {
      // set button moving
      button.className = "normalButton";
      button.addEventListener("mouseenter", function (e) {
        moveButton(e.target);
      });
      button.addEventListener("mouseleave", function (e) {
        moveButtonBack(e.target);
      });
    } else if (num >= 0.5 && num < 9.0) {
      // disable the button
      button.className = "disabled";
    }
  });

  // move the button
  const moveButton = (button) => {
    button.style.position = "absolute";
    let topStyle = Math.floor(Math.random() * 90 + 5) + "px";
    let leftStyle = Math.floor(Math.random() * 90 + 5) + "px";
    let topStyleString = topStyle.toString();
    let leftStyleString = leftStyle.toString();
    button.style.top = topStyleString;
    button.style.left = leftStyleString;
  };

  const moveButtonBack = (button) => {
    button.style.position = "fixed";
  };

  const [firstSpinning, setFirstSpinning] = useState(false);
  const [secondSpinning, setSecondSpinning] = useState(false);
  const [thirdSpinning, setThirdSpinning] = useState(false);
  const [icons, setIcons] = useState([]);
  // for determining if the user has played their first round or not
  const [hasGameStarted, setHasGameStarted] = useState(false);
  // determine if user won the game or not
  const [didUserWin, setDidUserWin] = useState(false);

  // timeout function for the spinning icons
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // check whether the icons are all the same and the user won
  const doIconsMatch = (array) => {
    const result = array.every((element) => {
      if (element === array[0]) {
        return true;
      }
    });
    console.log("are all elements in array the same: ", result);
    const didUserWin = result;
    setDidUserWin(didUserWin);
    return result;
  };

  const handlePlayClick = () => {
    // the first round has started
    setHasGameStarted(true);
    // set the icons to a spinning state
    setFirstSpinning(true);
    setSecondSpinning(true);
    setThirdSpinning(true);
    // generate the result
    getResult();
  };

  const getResult = async () => {
    newIcons = [];
    // get random numbers for 1-4
    for (let i = 0; i < 3; i++) {
      const min = 1;
      const max = 4;
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      newIcons.push(randomNumber);
    }

    setIcons(newIcons);
    doIconsMatch(newIcons);

    console.log("new icons: ", newIcons);

    await delay(2000);
    setFirstSpinning(false);
    await delay(2000);
    setSecondSpinning(false);
    await delay(3000);
    setThirdSpinning(false);
  };

  return (
    <div>
      <table id="slotMachineTable">
        <tbody>
          <tr>
            {/* -------- first column -------- */}
            {hasGameStarted === false && (
              <td>
                <img src={Cherry} />
              </td>
            )}
            {firstSpinning && (
              <td>
                <img className="loading-image" src={Loading} />
              </td>
            )}
            {!firstSpinning && hasGameStarted === true && (
              <td id="first-result-column">
                {icons[0] === 1 && <img id="first-image" src={Cherry} />}
                {icons[0] === 2 && <img id="first-image" src={Lemon} />}
                {icons[0] === 3 && <img id="first-image" src={Orange} />}
                {icons[0] === 4 && <img id="first-image" src={Watermelon} />}
              </td>
            )}
            {/* -------- second column -------- */}
            {hasGameStarted === false && (
              <td>
                <img src={Cherry} />
              </td>
            )}
            {secondSpinning && (
              <td>
                <img className="loading-image" src={Loading} />
              </td>
            )}
            {!secondSpinning && hasGameStarted === true && (
              <td id="second-result-column">
                {icons[1] === 1 && <img id="second-image" src={Cherry} />}
                {icons[1] === 2 && <img id="second-image" src={Lemon} />}
                {icons[1] === 3 && <img id="second-image" src={Orange} />}
                {icons[1] === 4 && <img id="second-image" src={Watermelon} />}
              </td>
            )}
            {/* -------- third column -------- */}
            {hasGameStarted === false && (
              <td>
                <img src={Cherry} />
              </td>
            )}
            {thirdSpinning && (
              <td>
                <img className="loading-image" src={Loading} />
              </td>
            )}
            {!thirdSpinning && hasGameStarted === true && (
              <td id="third-result-column">
                {icons[2] === 1 && <img id="third-image" src={Cherry} />}
                {icons[2] === 2 && <img id="third-image" src={Lemon} />}
                {icons[2] === 3 && <img id="third-image" src={Orange} />}
                {icons[2] === 4 && <img id="third-image" src={Watermelon} />}
              </td>
            )}
          </tr>
        </tbody>
      </table>

      <div className="buttons">
        <div id="start-button-div">
          <button id="start-button" onClick={handlePlayClick}>
            start game
          </button>
        </div>
        <div id="cash-button-div">
          <button id="cash-button" ref={ref}>
            cash out
          </button>
        </div>
      </div>

    </div>
  );
}
