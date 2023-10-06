"use client";
import Image from "next/image";
import LinkLogo from "public/link-logo.png";

import { useState } from "react";

const FormComponent = () => {
    const _controller: AbortController = new AbortController();

    const [shortURL, setShortURL] = useState<string>("");
    const [userInputURL, setUserInputURL] = useState<string>("");
    const [resultStyle, setResultStyle] = useState<string>("result mt-10 hidden");

    /**
     * The function `_requestTimeout` sets a timeout of 10 seconds and then aborts a controller.
     */
    const _requestTimeout = () => {
        setTimeout(() => {
            _controller.abort();
        }, 10000);
    }

    /**
     * The function `handleInputChange` is a TypeScript function that takes in an event of type
     * `React.ChangeEvent<HTMLInputElement>` and updates the `userInputURL` state with the value of the
     * input element.
     * @param event - The event parameter is an object that represents the event that triggered the
     * function. In this case, it is a React.ChangeEvent<HTMLInputElement> event, which means it is an
     * event that occurs when the value of an input element of type "text" or "password" changes.
     */
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInputURL(event.target.value);
    }

    /**
     * The `handleSubmit` function is an asynchronous function that handles form submission by making a
     * POST request to an API endpoint, setting the result style, setting a timeout for the request,
     * and updating the short URL state variable.
     * @param event - The `event` parameter is of type `React.FormEvent<HTMLFormElement>`. It
     * represents the form submission event that triggered the `handleSubmit` function.
     */
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
       /* The line `const _urlId: string = Math.random().toString(36).substring(2, 8);` is generating a
       random string of characters that will be used as a unique identifier for the shortened URL. */
        const _urlId: string = Math.random().toString(36).substring(2, 8); // In 'toString(36)' method, 36 represents base 36.

        try {
            /* The line `setResultStyle(`result mt-10 animate-[bounce_1s_infinite]`);` is setting the
            value of the `resultStyle` state variable. It is assigning a string value of `"result
            mt-10 animate-[bounce_1s_infinite]"` to set the `resultStyle` to show an animation.. */
            setResultStyle(`result mt-10 animate-[bounce_1s_infinite]`);

            _requestTimeout();

            /* The code `const res = await fetch(`/api/sites`, { ... })` is making a POST request to
            the `/api/sites` endpoint. */
            const res = await fetch(`/api/sites`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    "full_url": userInputURL,
                    "url_id": _urlId
                }),
                signal: _controller.signal
            })

            /* The line `if (!res.ok) throw new Error("Request timed out")` is checking if the response
            from the API request is not successful. If the response is not successful, it throws an
            error with the message "Request timed out". This is used to handle cases where the
            request takes too long to complete and indicates that the request has timed out. */
            if (!res.ok) throw new Error("Request timed out")
            
            /* The line `setShortURL(`${window.location.hostname}/`);` is setting the value of
            the `shortURL` state variable. It is combining the current hostname of the window (the
            domain name of the website) with the `_urlId` variable, which is a randomly generated
            string. This creates a shortened URL that includes the current domain name and a unique
            identifier. */
            setShortURL(`${window.location.hostname}/${_urlId}`);

        } catch (error) {
            console.error(error);
            setShortURL("Something went wrong.");

        } finally { setResultStyle("result mt-10") }
    }

    /**
     * The function `copyToClipBoard` uses the `navigator.clipboard` API to write the value of
     * `shortURL` to the clipboard.
     */
    const copyToClipBoard = async () => {
        navigator.clipboard.writeText(shortURL);
    }

    return (
        <>
            <div className="bg-white text-center py-2 rounded-lg">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="input" onClick={async () => { setUserInputURL(await window.navigator.clipboard.readText()) }}>
                        <Image
                            src={LinkLogo}
                            alt="Link Logo"
                            width={40}
                            height={40}
                            className="inline w-[5%] sm:w-[10%]" />
                    </label>
                    <input type="text" id="input-field" className="bg-gray-100 w-[78%] mr-2 px-4 py-2 focus:shadow-[0_0_10px_green] sm:w-[85%] sm:m-0" placeholder="Paste a long url" onChange={handleInputChange} value={userInputURL} required />
                    <button id="button" type="submit" className="bg-blue-500 rounded-full text-white w-[15%] px-4 py-2 sm:w-[30%] sm:mt-4">Shrink</button>
                </form>

                <p id="result" className={resultStyle}>
                    Your shorten link:<br />
                    <input type="text" id="output-field" className="bg-blue-100 w-[83%] mr-2 px-4 py-2 focus:shadow-[0_0_10px_purple] sm:m-0 sm:w-[95%]" value={shortURL} readOnly />
                    <button id="copy-button" onClick={copyToClipBoard} className="bg-purple-500 rounded-full text-white w-[15%] px-4 py-2 sm:w-[30%] sm:mt-4">Copy</button>
                </p>
            </div>
        </>
    )
}

export default FormComponent;