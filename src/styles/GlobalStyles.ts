import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${({ theme }) => theme.typography.body};
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.background.secondary};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    min-height: 100vh;
    background-color: ${({ theme }) => theme.colors.background.secondary};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.primary};
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: ${({ theme }) => theme.transitions.default};

    &:hover {
      color: ${({ theme }) => theme.colors.primary.slateBlue};
    }
  }

  button {
    font-family: ${({ theme }) => theme.typography.secondary};
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    transition: ${({ theme }) => theme.transitions.default};
  }

  img {
    max-width: 100%;
    height: auto;
  }
`; 