import React from 'react';

const CircleProgressBar = ({progress}) => {
    const circumference = 30 * 2 * Math.PI

    return (
        <div className="inline-flex absolute items-center justify-center overflow-hidden rounded-full bottom-5 left-5">
            <svg className="w-20 h-20">
                <circle
                    className="text-gray-300"
                    strokeWidth="5"
                    stroke="currentColor"
                    fill="transparent"
                    r="30"
                    cx="40"
                    cy="40"
                />
                <circle
                    className="text-blue-600"
                    strokeWidth="5"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress / 100 * circumference}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="30"
                    cx="40"
                    cy="40"
                />
            </svg>
            <span className="absolute text-xl text-blue-700"
            >{progress + '%'}</span>
        </div>
    )
};

export default CircleProgressBar
