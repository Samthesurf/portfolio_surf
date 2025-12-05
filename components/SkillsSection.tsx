"use client";

import { useEffect, useRef, useState } from "react";

// SVG icons as React components for crisp rendering
const PythonIcon = () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
        <linearGradient id="python-original-a" gradientUnits="userSpaceOnUse" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)">
            <stop offset="0" stopColor="#5A9FD4" />
            <stop offset="1" stopColor="#306998" />
        </linearGradient>
        <linearGradient id="python-original-b" gradientUnits="userSpaceOnUse" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)">
            <stop offset="0" stopColor="#FFD43B" />
            <stop offset="1" stopColor="#FFE873" />
        </linearGradient>
        <path fill="url(#python-original-a)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z" transform="translate(0 10.26)" />
        <path fill="url(#python-original-b)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z" transform="translate(0 10.26)" />
    </svg>
);

const FlutterIcon = () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
        <g fill="#3FB6D3">
            <path d="M12.3 64.2L76.3 0h39.4L32.1 83.6zM76.3 128h39.4L81.6 93.9l34.1-34.8H76.3L42.2 93.9z" />
        </g>
        <path fill="#27AACD" d="M81.6 93.9l-20-20-19.4 19.6 19.4 19.6z" />
        <path fill="#19599A" d="M115.7 128L81.6 93.9l-19.4 19.6L76.3 128z" />
        <linearGradient id="flutter-a" gradientUnits="userSpaceOnUse" x1="59.365" y1="116.36" x2="86.825" y2="99.399">
            <stop offset="0" stopColor="#1B4E94" />
            <stop offset=".63" stopColor="#1A5497" />
            <stop offset="1" stopColor="#195A9B" />
        </linearGradient>
        <path fill="url(#flutter-a)" d="M61.6 113.5l30.8-8.4-10.8-11.2z" />
    </svg>
);

const DartIcon = () => (
    <svg viewBox="0 0 256 256" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet">
        <path d="M70.534 69.696L53.988 53.15l.07 119.6.198 5.59c.082 2.63.57 5.598 1.384 8.674l131.104 46.23 32.772-14.52.012-.04L70.534 69.696" fill="#00D2B8" />
        <path d="M55.64 187.014l.008.008c-.008-.054-.036-.114-.036-.17 0 .056.008.108.028.162zm163.876 31.71l-32.772 14.52-131.096-46.222c2.504 9.608 8.048 20.408 14.014 26.314l42.784 42.54 95.13.124 11.952-37.316-.012.04z" fill="#55DDCA" />
        <path d="M3.034 130.116c-4.236 4.522-2.132 13.85 4.688 20.722L37.14 180.5l18.5 6.514c-.814-3.076-1.302-6.044-1.384-8.674l-.198-5.59-.07-119.6-50.954 76.966z" fill="#0081C6" />
        <path d="M187.82 54.686c-3.076-.786-6.026-1.272-8.7-1.356l-5.908-.204-119.224.016 165.556 165.542h.014l14.54-32.804L187.82 54.686" fill="#0079B3" />
        <path d="M187.67 54.654c.064.014.114.032.156.038l-.006-.006c-.036-.018-.086-.018-.15-.032zm26.448 14.078c-6.008-6.058-16.666-11.564-26.292-14.04l46.272 131.188-14.54 32.804h-.014l35.532-11.348.076-97.416-41.034-41.188z" fill="#00A4E4" />
        <path d="M181.338 36.298L151.684 6.862c-6.858-6.794-16.19-8.908-20.7-4.684L53.988 53.142l119.224-.016 5.908.204c2.674.084 5.624.57 8.7 1.356l-6.482-18.388z" fill="#00D2B8" />
    </svg>
);

const FirebaseIcon = () => (
    <svg viewBox="0 0 256 351" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
        <defs>
            <path d="M1.253 280.732l1.605-3.131 99.353-188.518-44.15-83.475C54.392-1.283 45.074.474 43.87 8.188L1.253 280.732z" id="firebase-a" />
            <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="firebase-b">
                <feGaussianBlur stdDeviation="17.5" in="SourceAlpha" result="shadowBlurInner1" />
                <feOffset in="shadowBlurInner1" result="shadowOffsetInner1" />
                <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1" />
                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" in="shadowInnerInner1" />
            </filter>
            <path d="M134.417 148.974l32.039-32.812-32.039-61.007c-3.042-5.791-10.433-6.398-13.443-.59l-17.705 34.109-.53 1.744 31.678 58.556z" id="firebase-c" />
            <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="firebase-d">
                <feGaussianBlur stdDeviation="3.5" in="SourceAlpha" result="shadowBlurInner1" />
                <feOffset dx="1" dy="-9" in="shadowBlurInner1" result="shadowOffsetInner1" />
                <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1" />
                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0" in="shadowInnerInner1" />
            </filter>
        </defs>
        <path d="M0 282.998l2.123-2.972L102.527 89.512l.212-2.017L58.48 4.358C54.77-2.606 44.33-.845 43.114 6.951L0 282.998z" fill="#FFC24A" />
        <use fill="#FFA712" fillRule="evenodd" href="#firebase-a" />
        <use filter="url(#firebase-b)" href="#firebase-a" />
        <path d="M135.005 150.38l32.955-33.75-32.965-62.93c-3.129-5.957-11.866-5.975-14.962 0L102.42 87.287v2.86l32.584 60.233z" fill="#F4BD62" />
        <use fill="#FFA50E" fillRule="evenodd" href="#firebase-c" />
        <use filter="url(#firebase-d)" href="#firebase-c" />
        <path fill="#F6820C" d="M0 282.998l.962-.968 3.496-1.42 128.477-128 1.628-4.431-32.05-61.074z" />
        <path d="M139.121 347.551l116.275-64.847-33.204-204.495c-1.039-6.398-8.888-8.927-13.468-4.34L0 282.998l115.608 64.548a24.126 24.126 0 0 0 23.513.005" fill="#FDE068" />
        <path d="M254.354 282.16L221.402 79.218c-1.03-6.35-7.558-8.977-12.103-4.424L1.29 282.6l114.339 63.908a23.943 23.943 0 0 0 23.334.006l115.392-64.355z" fill="#FCCA3F" />
        <path d="M139.12 345.64a24.126 24.126 0 0 1-23.512-.005L.931 282.015l-.93.983 115.607 64.548a24.126 24.126 0 0 0 23.513.005l116.275-64.847-.285-1.752-115.99 64.689z" fill="#EEAB37" />
    </svg>
);

const CloudflareIcon = () => (
    <svg viewBox="0 0 256 116" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
        <defs>
            <radialGradient cx="54.701%" cy="52.771%" fx="54.701%" fy="52.771%" r="49.979%" id="cloudflare-a">
                <stop stopColor="#FFF" offset="0%" /><stop stopColor="#FCE800" offset="19.02%" /><stop stopColor="#EC8F27" offset="85.93%" />
            </radialGradient>
            <linearGradient x1="50.033%" y1="40.182%" x2="50.033%" y2="-6.53%" id="cloudflare-b">
                <stop stopColor="#F68B1F" offset="0%" /><stop stopColor="#FFF" offset="100%" />
            </linearGradient>
            <linearGradient x1="23.113%" y1="2.836%" x2="49.169%" y2="48.674%" id="cloudflare-c">
                <stop stopColor="#FFF" offset="0%" /><stop stopColor="#FEF6ED" offset="4.821%" /><stop stopColor="#FBD0A5" offset="25.69%" /><stop stopColor="#F9B26B" offset="44.42%" /><stop stopColor="#F79D42" offset="60.34%" /><stop stopColor="#F69028" offset="72.82%" /><stop stopColor="#F68B1F" offset="80.33%" />
            </linearGradient>
            <linearGradient x1="-6.441%" y1="-87.453%" x2="83.291%" y2="187.144%" id="cloudflare-d">
                <stop stopColor="#FFF" offset="0%" /><stop stopColor="#FEF6ED" offset="4.821%" /><stop stopColor="#FBD0A5" offset="25.69%" /><stop stopColor="#F9B26B" offset="44.42%" /><stop stopColor="#F79D42" offset="60.34%" /><stop stopColor="#F69028" offset="72.82%" /><stop stopColor="#F68B1F" offset="80.33%" />
            </linearGradient>
            <linearGradient x1="67.858%" y1="-4.377%" x2="52.765%" y2="67.743%" id="cloudflare-e">
                <stop stopColor="#FFF" offset="0%" /><stop stopColor="#FEF6ED" offset="4.821%" /><stop stopColor="#FBD0A5" offset="25.69%" /><stop stopColor="#F9B26B" offset="44.42%" /><stop stopColor="#F79D42" offset="60.34%" /><stop stopColor="#F69028" offset="72.82%" /><stop stopColor="#F68B1F" offset="80.33%" />
            </linearGradient>
            <linearGradient x1="49.993%" y1=".354%" x2="49.993%" y2="99.773%" id="cloudflare-f">
                <stop stopColor="#F68B1F" offset="0%" /><stop stopColor="#CB672F" offset="53.08%" /><stop stopColor="#A1453F" offset="100%" />
            </linearGradient>
            <radialGradient cx="50.374%" cy="60.571%" fx="50.374%" fy="60.571%" r="51.634%" id="cloudflare-g">
                <stop stopColor="#FFF" offset="0%" /><stop stopColor="#FCE800" offset="13.34%" /><stop stopColor="#EC8F27" offset="85.93%" />
            </radialGradient>
        </defs>
        <path d="M199 33.9l5.8-20.1.8.1.6 21.1L217 17.1l1 .5-5.1 20.3 15.3-14.5.8.7-10.3 18.4 18.6-9.9.6.7-14.8 15.2 20.6-4.7.4.8-18.2 10.7 21.1.8v.9l-20.4 5.6 20.3 6v.9l-21.1.3L243.7 81l-.5.9-20.4-5.1L237.2 92l-.5.9-18.2-10.5 9.7 18.5-.9.7-15-14.7 5 20.3-1 .6-10.7-18.2-.3 20.9-1.1.3-5.8-20.2-6 20.2-1.1-.3V89.6l-.6-.2-11.6 17.5 5-20.3-15.3 14.4-.9-.7 10.5-18.2-18.8 9.7-.6-.7 14.8-14.9-20.6 4.5-.3-.8 18.3-10.7-20.9-.8-.4-.9 20.3-5.7-20-5.9.1-1 21-.3-17.8-10.8.1-1 20.6 5.2-14.6-15.4.8-.8 18.4 10.1-10-18.3.6-.7 15.4 14.8-5-20.6-.2-.3L191.8 35l.2-21.2h1.2l5.8 20.1z" fill="url(#cloudflare-a)" />
        <path d="M256 101.9c0-20.1-16.3-36.5-36.5-36.5-8.1 0-15.6 2.7-21.7 7.2.8-3.8 1.2-7.8 1.2-11.8C199 27.2 171.8 0 138.2 0c-26.7 0-49.4 17.3-57.6 41.2-4.6-3.4-10.2-5.5-16.4-5.5-15.1 0-27.3 12.2-27.3 27.3 0 2.3.3 4.6.8 6.8-20.9.7-37.7 17.9-37.7 39 0 2.5.2 4.9.7 7.2h252.5c1.8-4.4 2.8-9.1 2.8-14.1z" fill="#F68B1F" />
        <path d="M191.8 60.8c0 29.6-24.1 48.3-53.7 48.3S84.6 90.4 84.6 60.8c0-29.6 24-53.6 53.6-53.6s53.6 24 53.6 53.6" fill="url(#cloudflare-b)" />
        <path d="M183.6 61.1c0 18.1-20.5 32.8-45.7 32.8-25.3 0-45.7-14.7-45.7-32.8 0-18.1 20.5-32.8 45.7-32.8 25.3.1 45.7 14.7 45.7 32.8" fill="#F68B1F" />
        <circle fill="url(#cloudflare-c)" cx="64.4" cy="63.2" r="20.3" />
        <path d="M80.8 55.5c3.4 5.9-.9 14.9-9.6 19.9-8.7 5-18.6 4.3-22-1.6-3.4-5.9.9-14.9 9.6-19.9 8.8-5.1 18.6-4.3 22 1.6" fill="#F68B1F" />
        <path d="M70.8 108.7c0-17.6-14.3-31.9-31.9-31.9C21.3 76.8 7 91.1 7 108.7v.2h63.8v-.2z" fill="url(#cloudflare-d)" />
        <path d="M248.9 101.6c0-16.1-13-29.1-29.1-29.1s-29.1 13-29.1 29.1c0 2.3.3 4.5.8 6.6h56.7c.5-2.2.7-4.4.7-6.6z" fill="url(#cloudflare-e)" />
        <path d="M250.2 109.2l-1.1-2.2-1.2-2-1.7-2.6-1.7-2.2-2-2.5-2.1-2.2-2.4-2.3-2.2-1.9-2.6-1.8-2.5-1.5-2.8-1.6-2.3-1.2-2.4-1-2.2-.6-2.2-.4-2.1-.4-2.6-.2-164.9.3-2.6.1-2.7.2-2.9.3-2.4.5-3.1.7-2.1.7-2.3.9-2.3.8-2.9 1.5-2.1 1-2.8 1.8-2.5 2-2.7 2.1-2.3 2.3-1.8 2.2-1.9 2.5-1.4 2.5-1.1 2.2-.6 2-.4 1.7h244.6l-.7-1.7z" fill="url(#cloudflare-f)" />
        <path d="M202.6 67.8l22.1 28.9-.8.6-25.8-23.2-99.1 18-.1-.9L191 70l-50.7-17.2.6-.8 61.7 15.8z" fill="url(#cloudflare-g)" />
    </svg>
);

const GoogleCloudIcon = () => (
    <svg viewBox="0 0 2385.7 1919.9" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <g>
            <path fill="#EA4335" d="M1513.8,528.7h72.8l207.4-207.4l10.2-88c-385.9-340.6-975-303.9-1315.6,82C393.9,422.5,325.2,550,287.8,688 c23.1-9.5,48.7-11,72.8-4.4l414.7-68.4c0,0,21.1-34.9,32-32.7c184.5-202.6,495-226.2,708-53.8H1513.8z" />
            <path fill="#4285F4" d="M2089.4,688c-47.7-175.5-145.5-333.3-281.6-454l-291,291c122.9,100.4,192.9,251.7,189.9,410.4v51.7 c143.1,0,259,116,259,259c0,143.1-116,259-259,259h-518.1l-51.7,52.4v310.7l51.7,51.7h518.1c297,2.3,560.5-190.2,648.7-473.8 C2443.4,1162.4,2335.4,854.4,2089.4,688L2089.4,688z" />
            <path fill="#34A853" d="M669.8,1917h518.1v-414.7H669.8c-36.9,0-73.4-7.9-107-23.3l-72.8,22.5l-208.8,207.4l-18.2,72.8 C380.1,1870.1,523,1917.6,669.8,1917L669.8,1917z" />
            <path fill="#FBBC05" d="M669.8,571.6c-287.8,1.7-542.7,186-634.5,458.7c-91.8,272.7-0.3,573.7,227.8,749.1l300.5-300.5 c-130.4-58.9-188.3-212.3-129.4-342.7c58.9-130.4,212.3-188.3,342.7-129.4c57.4,26,103.4,72,129.4,129.4l300.5-300.5 C1078.9,668.6,880.2,570.9,669.8,571.6L669.8,571.6z" />
        </g>
    </svg>
);

const GitHubIcon = () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
        <g fill="#ffffff">
            <path fillRule="evenodd" clipRule="evenodd" d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z" />
            <path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zm2.382 3.477c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0" />
        </g>
    </svg>
);

const skills = [
    { name: "Python", icon: PythonIcon },
    { name: "Flutter", icon: FlutterIcon },
    { name: "Dart", icon: DartIcon },
    { name: "Firebase", icon: FirebaseIcon },
    { name: "Cloudflare", icon: CloudflareIcon },
    { name: "Google Cloud", icon: GoogleCloudIcon },
    { name: "GitHub", icon: GitHubIcon },
];

export default function SkillsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="skills"
            className="relative py-24 md:py-32"
        >
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                {/* Section Header */}
                <div
                    className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400">
                            Technologies I Use
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        With deep expertise across the mobile development ecosystem, I transform complex ideas
                        into elegant, scalable applications. From crafting pixel-perfect Flutter interfaces to
                        architecting robust cloud backends; I bring ideas to life.
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-6 md:gap-8 mb-16">
                    {skills.map((skill, index) => {
                        const IconComponent = skill.icon;
                        return (
                            <div
                                key={skill.name}
                                className={`group flex flex-col items-center transition-all duration-700 ${isVisible
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-12'
                                    }`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="relative w-16 h-16 md:w-20 md:h-20 mb-3 p-3 md:p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                                    <IconComponent />
                                </div>
                                <span className="text-gray-400 text-sm md:text-base font-medium text-center group-hover:text-white transition-colors duration-300">
                                    {skill.name}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Call to Action */}
                <div
                    className={`text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                >
                    <p className="text-gray-500 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                        These aren't just logos on a page, they represent <span className="text-white font-medium">real projects</span>,
                        <span className="text-white font-medium"> real challenges solved</span>, and
                        <span className="text-white font-medium"> real value delivered</span>.
                    </p>

                    <a
                        href="#projects"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] group"
                    >
                        <span>See What I've Built</span>
                        <svg
                            className="w-5 h-5 group-hover:translate-y-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
