import { createGlobalStyle } from 'styled-components'

export const defaultStyles = createGlobalStyle`
/* Globals */
body {
    background-color: #FFFF00;
    font-family: Roboto, sans-serif;
}

button {
    background-color: purple;
    border: 2px solid black;
    border-radius: 0;
    color: white;
    padding: 10px 20px;
    text-align: center;
    display: inline-block;
    cursor: pointer;
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;
    outline: none;
    margin: 6px;
    height: 48px;
}

button:hover {
    transform: translateY(-4px);
    transform: translateX(-4px);
    box-shadow: 6px 6px 0px rgba(0, 0, 0, 0.3);
}

.submit-button-error-box{
    display: flex;
    align-items: center;
    margin-top: 6px;
}

.flex-box {
    display: flex;
    align-items: center;
}
.error-message {
    color: white;
    background-color: brown;
    padding: 3px;
    border: 2px solid black;
}

/* Navbar */
.navbar-main-link {
    text-decoration: none;
    color: inherit;
    background-color: lightblue;
    padding: 3px;
    border: 2px solid black;
}

.navbar-main-link:hover {
    color: #353535;
}


/* Main Menu */
.settings-panel {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: 200px; 
    background-color: #ffffff; 
    box-shadow: -2px 0px 5px 0px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease-in-out;
    transform: translateX(100%);
    z-index: 9999;
}

.settings-panel.show {
    transform: translateX(0);
}


.main-menu-link {
    text-decoration: none;
    color: white;
    height: 100%;
}

.main-menu-button:hover {
    transform: translateY(-4px); 
    transform: translateX(-4px);
    box-shadow: 6px 6px 0px rgba(0, 0, 0, 0.3); 
}

.main-menu-button-box {
    display: flex;
}

.main-menu-text {
    background-color: pink;
    padding: 8px ;
    border: 2px solid black;
    border-radius: 0;
}


.main-menu-title {
    font-size: 20vW;
    margin: 20px;
  }

.user-setting-box {
display: flex !important;
align-items: center !important;
background-color: pink;
padding: 8px ;
border: 2px solid black;
justify-content: space-between;
}
  


/*Login page*/
.login-form {
    background-color: lime;
    padding: 10px ;
    border: 2px solid black;
    border-radius: 0;
}
`