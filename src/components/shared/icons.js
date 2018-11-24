import React from 'react'
import styled, { keyframes } from 'react-emotion'

export const Pencil = React.memo(styled.div`
  color: var(--white1);
  position: relative;
  margin-left: 0.25rem;
  margin-top: -0.25rem;
  width: 0.875rem;
  height: 0.25rem;
  border-radius: 0.0625rem;
  border: solid 0.0625rem currentColor;
  transform: rotate(-45deg);

  &::before {
    content: '';
    position: absolute;
    left: -0.75rem;
    top: -0.0625rem;
    width: 0px;
    height: 0px;
    border-left: solid 0.3125rem transparent;
    border-right: solid 0.3125rem currentColor;
    border-top: solid 0.125rem transparent;
    border-bottom: solid 0.125rem transparent;
  }
`)

export const Trash = React.memo(styled.div`
  color: var(--white1);
  position: relative;
  margin-top: 0.25rem;
  margin-left: auto;
  margin-right: auto;
  width: 0.625rem;
  height: 0.625rem;
  border-left: solid 0.0625rem currentColor;
  border-right: solid 0.0625rem currentColor;
  border-bottom: solid 0.0625rem currentColor;
  border-radius: 0 0 0.125rem 0.125rem;

  &::before {
    content: '';
    position: absolute;
    left: -0.1875rem;
    top: -0.125rem;
    width: 0.875rem;
    height: 0.0625rem;
    background-color: currentColor;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0px;
    top: -0.3125rem;
    width: 0.375rem;
    height: 0.125rem;
    border-left: solid 0.0625rem currentColor;
    border-right: solid 0.0625rem currentColor;
    border-top: solid 0.0625rem currentColor;
    border-radius: 0.25rem 0.25rem 0 0;
  }
`)

export const Exit = React.memo(styled.div`
  color: var(--white1);
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 0;
  margin-left: 0;
  width: 21px;
  height: 21px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 10px;
    width: 21px;
    height: 1px;
    background-color: currentColor;
  }

  &::before {
    transform: rotate(-45deg);
  }

  &::after {
    transform: rotate(45deg);
  }
`)

export const Email = React.memo(() => (
  <div
    className="icon"
    dangerouslySetInnerHTML={{
      __html: `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width=".865rem" height=".865rem"
	 viewBox="0 0 490.2 490.2" style="enable-background:new 0 0 490.2 490.2;" xml:space="preserve">
    <g>
      <path style="fill:var(--white1" d="M420.95,61.8C376.25,20.6,320.65,0,254.25,0c-69.8,0-129.3,23.4-178.4,70.3s-73.7,105.2-73.7,175
        c0,66.9,23.4,124.4,70.1,172.6c46.9,48.2,109.9,72.3,189.2,72.3c47.8,0,94.7-9.8,140.7-29.5c15-6.4,22.3-23.6,16.2-38.7l0,0
        c-6.3-15.6-24.1-22.8-39.6-16.2c-40,17.2-79.2,25.8-117.4,25.8c-60.8,0-107.9-18.5-141.3-55.6c-33.3-37-50-80.5-50-130.4
        c0-54.2,17.9-99.4,53.6-135.7c35.6-36.2,79.5-54.4,131.5-54.4c47.9,0,88.4,14.9,121.4,44.7s49.5,67.3,49.5,112.5
        c0,30.9-7.6,56.7-22.7,77.2c-15.1,20.6-30.8,30.8-47.1,30.8c-8.8,0-13.2-4.7-13.2-14.2c0-7.7,0.6-16.7,1.7-27.1l18.6-152.1h-64
        l-4.1,14.9c-16.3-13.3-34.2-20-53.6-20c-30.8,0-57.2,12.3-79.1,36.8c-22,24.5-32.9,56.1-32.9,94.7c0,37.7,9.7,68.2,29.2,91.3
        c19.5,23.2,42.9,34.7,70.3,34.7c24.5,0,45.4-10.3,62.8-30.8c13.1,19.7,32.4,29.5,57.9,29.5c37.5,0,69.9-16.3,97.2-49
        c27.3-32.6,41-72,41-118.1C488.05,152.9,465.75,103,420.95,61.8z M273.55,291.9c-11.3,15.2-24.8,22.9-40.5,22.9
        c-10.7,0-19.3-5.6-25.8-16.8c-6.6-11.2-9.9-25.1-9.9-41.8c0-20.6,4.6-37.2,13.8-49.8s20.6-19,34.2-19c11.8,0,22.3,4.7,31.5,14.2
        s13.8,22.1,13.8,37.9C290.55,259.2,284.85,276.6,273.55,291.9z"/>
    </g>
    </svg>
    `,
    }}
  />
))

export const Facebook = React.memo(() => (
  <div
    className="icon"
    dangerouslySetInnerHTML={{
      __html: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width=".865rem" height=".865rem" viewBox="0 0 58 58" version="1.1">
    <defs/>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="flogo-RGB-HEX-Blk-58" fill-rule="nonzero">
            <path d="M54.8,0 L3.2,0 C1.4326888,-1.082166e-16 2.164332e-16,1.4326888 0,3.2 L0,54.8 C2.164332e-16,56.5673112 1.4326888,58 3.2,58 L31,58 L31,35.57 L23.45,35.57 L23.45,26.79 L31,26.79 L31,20.33 C31,12.84 35.58,8.76 42.26,8.76 C44.5110737,8.75509083 46.7608479,8.86858092 49,9.1 L49,16.93 L44.4,16.93 C40.76,16.93 40.05,18.65 40.05,21.19 L40.05,26.78 L48.75,26.78 L47.62,35.56 L40,35.56 L40,58 L54.8,58 C56.5673112,58 58,56.5673112 58,54.8 L58,3.2 C58,1.4326888 56.5673112,1.082166e-16 54.8,0 Z" id="Shape" fill=var(--white1)>
            <path d="M40,58 L40,35.57 L47.57,35.57 L48.7,26.79 L40,26.79 L40,21.2 C40,18.66 40.71,16.94 44.35,16.94 L49,16.94 L49,9.1 C46.7575303,8.86823046 44.504409,8.75473991 42.25,8.76 C35.56,8.76 31,12.84 31,20.33 L31,26.79 L23.45,26.79 L23.45,35.57 L31,35.57 L31,58 L40,58 Z" id="f" fill=var(--white1)/>
        </g>
    </g>
  </svg>`,
    }}
  />
))

export const Twitter = React.memo(() => (
  <div
    className="icon"
    dangerouslySetInnerHTML={{
      __html: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width=".95rem" height=".875rem" viewBox="0 0 70 58" version="1.1">
    <defs/>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Twitter_Logo_Blue" fill=var(--white1) fill-rule="nonzero">
            <path d="M22.0136,58 C48.4288,58 62.8768,35.6839278 62.8768,16.3315305 C62.8768,15.6976809 62.8768,15.0666865 62.8348,14.4385474 C65.6455278,12.3654335 68.0717953,9.79853855 70,6.85804943 C67.3788614,8.04238238 64.598322,8.81906757 61.7512,9.16217818 C64.7492832,7.33195777 66.9931458,4.45333843 68.0652,1.06203784 C65.246041,2.76787919 62.1618091,3.97007108 58.9456,4.61673461 C54.4938318,-0.210245866 47.4200142,-1.39166631 41.690738,1.73494602 C35.9614617,4.86155834 33.00157,11.5186301 34.4708,17.9732579 C22.9233081,17.3829485 12.1645322,11.821272 4.872,2.6723583 C1.06014372,9.36388146 3.00716607,17.9243186 9.3184,22.2217629 C7.03287536,22.1526892 4.79718224,21.523995 2.8,20.3887386 C2.8,20.4486973 2.8,20.5115112 2.8,20.5743251 C2.80187077,27.545508 7.62090417,33.5497825 14.322,34.9301608 C12.2076349,35.5181563 9.98922564,35.6041093 7.8372,35.1814164 C9.7186542,41.1470908 15.1104088,45.2338815 21.2548,45.3515609 C16.1692581,49.4271334 9.88696663,51.6395989 3.4188,51.6329528 C2.27612999,51.6307159 1.13457138,51.5601671 0,51.4216696 C6.56778066,55.7195023 14.2097575,57.9991918 22.0136,57.9885793" id="Shape"/>
        </g>
    </g>
</svg>`,
    }}
  />
))

const loaderSpin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const Loader = React.memo(
  styled.div`
    margin: 0;
    font-size: 1.5px;
    position: relative;
    text-indent: -9999em;
    border-top: 1.1em solid var(--white1);
    border-right: 1.1em solid var(--white1);
    border-bottom: 1.1em solid var(--white1);
    border-left: 1.1em solid var(--black1);
    border-radius: 50%;
    width: 10em;
    height: 10em;
    transform: translateZ(0);
    animation: ${loaderSpin} 1.1s infinite linear;
    opacity: ${props => (props.isShowing ? '1' : '0')};

    &::after {
      content: '';
      border-radius: 50%;
      width: 10em;
      height: 10em;
    }
  `,
  (prevProps, nextProps) => prevProps.isShowing === nextProps.isShowing
)
