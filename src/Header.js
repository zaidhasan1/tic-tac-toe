import styled from "styled-components";

const Header = () => {
  return (
    <Head>
      <Text> Tic-Tac-Toe</Text>
    </Head>
  );
};

const Head = styled.div`
  width: 100%;
  height: auto;
  background-color: #007aaf;
  padding: 5px;
`;

const Text = styled.div`
  color: white;
  font-size: 20px;
  padding : 20px;
  font-weight : bold
`;

export default Header;
