import React from "react";

export default function Svg({ onClick, s, className, type }) {
  if (type === "cancel")
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="#F43C33"
        className={s[className]}
        onClick={onClick}
      >
        <path d="M25,2C12.319,2,2,12.319,2,25s10.319,23,23,23s23-10.319,23-23S37.681,2,25,2z M33.71,32.29c0.39,0.39,0.39,1.03,0,1.42	C33.51,33.9,33.26,34,33,34s-0.51-0.1-0.71-0.29L25,26.42l-7.29,7.29C17.51,33.9,17.26,34,17,34s-0.51-0.1-0.71-0.29	c-0.39-0.39-0.39-1.03,0-1.42L23.58,25l-7.29-7.29c-0.39-0.39-0.39-1.03,0-1.42c0.39-0.39,1.03-0.39,1.42,0L25,23.58l7.29-7.29	c0.39-0.39,1.03-0.39,1.42,0c0.39,0.39,0.39,1.03,0,1.42L26.42,25L33.71,32.29z"></path>
      </svg>
    );

  if (type === "arrowLeft")
    return (
      <svg
        version="1.1"
        id="Capa_1"
        x="0px"
        y="0px"
        viewBox="0 0 490 490"
        onClick={onClick}
        className={s[className]}
      >
        <g>
          <g>
            <g>
              <path
                d="M245,490c135.1,0,245-109.9,245-245S380.1,0,245,0S0,109.9,0,245S109.9,490,245,490z M245,34.3
				c116.2,0,210.7,94.5,210.7,210.7S361.2,455.7,245,455.7S34.3,361.2,34.3,245S128.8,34.3,245,34.3z"
              />
              <path
                d="M259.8,329.2c3.3,3.3,7.7,5,12.1,5s8.8-1.7,12.1-5c6.7-6.7,6.7-17.6,0-24.3l-60-60l60-60c6.7-6.7,6.7-17.6,0-24.3
				s-17.6-6.7-24.3,0l-72.1,72.1c-3.2,3.2-5,7.6-5,12.1s1.8,8.9,5,12.1L259.8,329.2z"
              />
            </g>
          </g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </svg>
    );

  if (type === "arrowRight")
    return (
      <svg
        version="1.1"
        id="Layer_1"
        x="0px"
        y="0px"
        viewBox="0 0 512 512"
        onClick={onClick}
        className={s[className]}
      >
        <g>
          <g>
            <g>
              <path
                d="M490,245C490,109.9,380.1,0,245,0S0,109.9,0,245s109.9,245,245,245S490,380.1,490,245z M34.3,245
				c0-116.2,94.5-210.7,210.7-210.7S455.7,128.8,455.7,245S361.2,455.7,245,455.7S34.3,361.2,34.3,245z"
              />
              <path
                d="M302.3,232.9l-72.1-72.1c-6.7-6.7-17.6-6.7-24.3,0s-6.7,17.6,0,24.3l60,60l-60,60c-6.7,6.7-6.7,17.6,0,24.3
				c3.3,3.3,7.7,5,12.1,5c4.4,0,8.8-1.7,12.1-5l72.1-72.1C309,250.4,309,239.6,302.3,232.9z"
              />
            </g>
          </g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </svg>
    );

  if (type === "reload")
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="60"
        height="60"
        viewBox="0 0 30 30"
        onClick={onClick}
        className={s[className]}
      >
        <path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z"></path>
      </svg>
    );
}