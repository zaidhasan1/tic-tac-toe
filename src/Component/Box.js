import styled from "styled-components";

const Box = ({ xOrO = "", onClick, isLine = false }) => {
  return (
    <BoxStyle onClick={onClick}>
      {isLine ? <LineImage src="/line.png" /> : false}
      {xOrO === "x" ? <Image src="/x.png" alt="ximage" /> : xOrO === "o" ? <Image src="/o.png" alt="oimage" /> : ""}
    </BoxStyle>
  );
};

const BoxStyle = styled.div`
  border: 1px solid black;
  height: 200px;
  width: 200px;
`;

const Image = styled.img`
  height: 180px;
  width: 180px;
  margin-left: 10px;
  margin-top: 10px;
`;

const LineImage = styled.img`
  height: auto;
  width: 200px;
  position: absolute;
  margin-top : 10px
  margin-left : 10px
`;

export default Box;
