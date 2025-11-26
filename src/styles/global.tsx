import { Global, css} from '@emotion/react';
import { theme } from './theme';

export const GlobalStyles = () => (
    <Global styles={css`
        *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        color: ${theme.colors.allTextColor};
        outline: none;
        body {
        font-size: 15px;
        color:rgb(26, 26, 26);
        min-height: 100vh;
        position: relative;
        overflow-x: hidden;
        font-family: 'inter', systom-ui, sans-serif;
        }
        body::before {
        content: "";
        position: fixed;
        inset: 0;
        z-index: -1;
        background: 
            radial-gradient(circle at 20% 45%, rgba(255, 230, 0, 0.5), transparent 60%),
            radial-gradient(circle at 25% 10%, rgba(209, 23, 190, 0.5), transparent 70%),
            radial-gradient(circle at 80% 15%, rgba(138, 0, 207, 0.5), transparent 70%),
            radial-gradient(circle at 70% 50%, rgba(238, 131, 17, 0.5), transparent 60%);
        filter: blur(90px);
        }
        button{
        border: none;
        outline: none;
        }
        a{
        text-decoration:none;
        font-size:inherit;
        color:inherit;
        }
        ul{
        list-style:none;
        }
        `} 
        />
);
