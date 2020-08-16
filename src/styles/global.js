import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    html {
        font-size: 16px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
          "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
          sans-serif;
        font-size: 14px;
        position: relative;
        background: ${props => props.theme.colors.primaryBG};
    }
    *, *:before, *:after {
        -webkit-box-sizing: inherit;
        -moz-box-sizing: inherit;
        box-sizing: inherit;
    }
    a,
    a:link {
        text-decoration: none;
    }
    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
        monospace;
    }

    input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .row {
        display: flex;
        flex-direction: row;
        margin-top: 15px;
        margin-bottom: 15px;
        position: relative;
        &.center {
            justify-content: center;
            text-align: center;
        }
        &.space-between {
            justify-content: space-between;
        }
        .vs {
            position: absolute;
            bottom: 15px;
            left: 0;
            right: 0;
            margin-right: auto;
            margin-left: auto;
            text-align: center;
            font-weight: 700;
        }
    }
    .column {
        flex-direction: column !important;
    }
    p.error-message {
        margin: 0 0 10px;
        background: ${props => props.theme.colors.alert.background};
        color: ${props => props.theme.colors.alert.color};
        border-radius: 3px;
        padding: 10px;
    }
`;