import styled from "styled-components";

export const Container = styled.div`
@keyframes p-progress-spinner-color {
    100%,
    0% {
        stroke: #C3073F;
    }
    40% {
        stroke: #1A1A1D;
    }
    66% {
        stroke: #C3073F;
    }
    80%,
    90% {
        stroke: #d62d20;
    }
}

position:absolute;
width: 100%;
height: 100%;
top: 0;
left: 0;
z-index: 1;
display: flex;
align-items: center;
justify-content: center;
color: #fff;

div {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(0,0,0,0.8);
}

.p-progress-spinner{
    z-index: 2;
    width: 50px;
    height: 50px;
    background: none;
    stroke: red;
}

`;