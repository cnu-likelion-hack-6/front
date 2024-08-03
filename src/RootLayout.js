import styled from "styled-components";

export default function RootLayout({ children }) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  background-color: white;
  max-width: 390px;
  margin: 0 auto;
  min-height: 100vh;
`;