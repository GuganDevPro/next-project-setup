'use client'
import React, { useState, useEffect, useContext } from 'react';
import { useGlobalContext } from "@/utils/GlobalProvider";
import { minutesToMilliseconds } from '@/utils/common';
const validateCaptcha = (captchaInputValue, captchaTextVal) => {
    if (captchaInputValue === captchaTextVal) {
        return true;
    } else {
        return false;
    }
};
export default function Captcha() {
    let captchaText = ''
    let refreshingTime = minutesToMilliseconds(process.env.NEXT_PUBLIC_CAPTCHA_REFRESH_TIME);
    const { setCaptchaValue } = useGlobalContext();
    const [localCaptcha, setLocalCaptcha] = useState("");
    const canvasStyling = { width: 200, height: 50, backgroundColor: '#123456', font: "30px 'Lucida Console', monospace", fillStyle: 'white', textAlign: 'center', textBaseline: 'middle' };
    const strokeStyling = { color: "#abcdef", strokeCount: 5 };
    const captchaLength = 5;

    useEffect(() => {
        setCaptchaValue(localCaptcha);
    }, [localCaptcha, setCaptchaValue]);

    React.useEffect(() => {
        drawCaptcha();
    }, []);
    const generateCaptchaText = () => {
        const randomString = Math.random().toString(36).substring(2, parseInt(captchaLength) + 2);
        const randomStringArray = randomString.split("");
        const changeString = randomStringArray.map((char) => (Math.random() > 0.5 ? char.toUpperCase() : char));
        setLocalCaptcha(changeString.join(""));
        return changeString.join("");
    };
    const refreshCaptcha = () => {
        drawCaptcha();
    }

    const drawCaptcha = () => {
        captchaText = generateCaptchaText();

        // Create a hidden canvas
        const canvas = document.createElement("canvas");
        canvas.width = canvasStyling.width; // Width of the CAPTCHA image
        canvas.height = canvasStyling.height; // Height of the CAPTCHA image
        const ctx = canvas.getContext("2d");

        // Draw the background
        ctx.fillStyle = canvasStyling.backgroundColor; // Background color
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw random lines for added security
        ctx.strokeStyle = strokeStyling.color;
        for (let i = 0; i < strokeStyling.strokeCount; i++) {
            ctx.beginPath();
            ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.stroke();
        }
        // Set text styles and draw the CAPTCHA text
        ctx.font = canvasStyling.font;
        ctx.fillStyle = canvasStyling.fillStyle;
        ctx.textAlign = canvasStyling.textAlign;
        ctx.textBaseline = canvasStyling.textBaseline;
        ctx.fillText(captchaText, canvas.width / 2, canvas.height / 2);

        // Convert the canvas to a Base64-encoded image URL
        const captchaImageUrl = canvas.toDataURL("image/png");

        // Set the CAPTCHA image as the src of the <img> tag
        const captchaImage = document.getElementById("captchaImage");
        captchaImage.src = captchaImageUrl;

        // Optionally, return the CAPTCHA text if needed for validation
        return captchaText;
    };
    setInterval(drawCaptcha, refreshingTime);
    return (
        <>
            <div>
                <img id="captchaImage" alt="CAPTCHA" />
                <button class="refresh_button" type="button" onClick={refreshCaptcha}>refresh</button>
            </div>
        </>
    );
}
export { validateCaptcha };
