import styled from '@emotion/primitives'

export const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px;
  border-radius: 10px;
  background-color: ${props => props.theme.backgroundColor};
`
