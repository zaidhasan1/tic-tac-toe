import { useEffect, useState } from "react";
import styled from "styled-components";
import Box from "./Box";
import Header from "../Header";

const MainComp = () => {
  const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [6, 4, 2],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];
  const [mainArr, setMainArr] = useState([
    [
      { id: 0, name: "" },
      { id: 1, name: "" },
      { id: 2, name: "" },
    ],
    [
      { id: 3, name: "" },
      { id: 4, name: "" },
      { id: 5, name: "" },
    ],
    [
      { id: 6, name: "" },
      { id: 7, name: "" },
      { id: 8, name: "" },
    ],
  ]);
  const [playerNo, setPlayerNo] = useState("x");
  const [playerOne, setPlayerOne] = useState([]);
  const [playerTwo, setPlayerTwo] = useState([]);
  const [playerWins, setPlayerWins] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [allFull, setAllFull] = useState([]);
  const [lineArr, setLineArr] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const [textPosition, setTextPosition] = useState({ left: 0, top: 0 });
  const [displayText, setDisplayText] = useState(false);

  const handleMouseMove = (event) => {
    setTextPosition({ left: event.pageX + 10, top: event.pageY + 10 });
    setDisplayText(true);
  };

  const handleMouseLeave = () => {
    setDisplayText(false);
  };

  const checkCombination = (arr, player) => {
    winningCombination.forEach((obj, ind) => {
      let b = [];
      obj.forEach((obj1) => {
        let find = arr.find((a) => a === obj1);
        if (find !== undefined) {
          if (b.length !== 3) {
            b.push(find);
          }
        }
        if (b.length === 3) {
          return;
        }
      });

      if (b.length > 2) {
        setPlayerWins(player);
        setLineArr(b);
        setIsGameOver(true);
        return true;
      }
    });
  };

  useEffect(() => {
    if (playerWins == null) {
      let mainArrLength = 0;
      mainArr.forEach((obj) => {
        obj.forEach((obj1) => {
          mainArrLength++;
        });
      });

      let allFullLength = allFull.length;
      if (allFullLength === mainArrLength) {
        setIsDraw(true);
        setIsGameOver(true);
      }
    }
  }, [allFull, playerWins]);

  useEffect(() => {
    if (playerOne.length > 2) {
      checkCombination(playerOne, "o");
    }
    if (playerTwo.length > 2) {
      checkCombination(playerTwo, "x");
    }
  }, [playerOne, playerTwo]);

  const updateState = (name, ind, ind1) => {
    let checkExisting = mainArr[ind][ind1];

    if (checkExisting.name == "") {
      setMainArr((mainArr) => {
        let newArr = [...mainArr];
        let nestedArr = [...newArr[ind]];
        let updatedElement = { ...nestedArr[ind1], name: name };
        nestedArr[ind1] = updatedElement;
        newArr[ind] = nestedArr;
        return newArr;
      });
    }
  };

  const mainLogic = (ind, ind1, obj) => {
    if (!isGameOver) {
      if (playerWins !== "") {
        if (playerNo === "x") {
          setPlayerOne((playerOne) => [...playerOne, obj.id]);
          updateState("o", ind, ind1);
          setPlayerNo("o");
        } else {
          setPlayerTwo((playerTwo) => [...playerTwo, obj.id]);
          updateState("x", ind, ind1);
          setPlayerNo("x");
        }
      }
      setAllFull((allFull) => [...allFull, obj.id]);
    }
  };

  return (
   <>
   <Header/>
    <Container onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {mainArr.map((obj, ind) => {
        return (
          <BoxParent key={ind}>
            {obj.map((obj1, ind1) => {
              let findLine = lineArr.find((a) => a == obj1.id);

              return (
                <Box
                  xOrO={obj1.name}
                  onClick={(e) => mainLogic(ind, ind1, obj1)}
                  key={ind1}
                  isLine={findLine === undefined ? false : true}
                />
              );
            })}
          </BoxParent>
        );
      })}
      {playerWins ? <WhoWin>{playerWins === "x" ? "X" : "O"} wins</WhoWin> : null}
      {isDraw ? <WhoWin> No one wins the match is draw </WhoWin> : null}
      {playerWins || isDraw ? <WhoWin onClick={() => window.location.reload()}> Reset </WhoWin> : null}

      {displayText && (
        <div
          style={{
            position: "absolute",
            left: `${textPosition.left}px`,
            top: `${textPosition.top}px`,
          }}
        >
          Player {playerNo === "o" ? "X" : "O"}
        </div>
      )}
    </Container>
   </>
  );
};

const Container = styled.div`
  width: 800px;
  height: 200px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
`;

const BoxParent = styled.div`
  display: flex;
`;

const WhoWin = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 20px;
  width: 100%;
  padding: 10px;
`;

export default MainComp;
