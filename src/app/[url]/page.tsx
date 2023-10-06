"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const LoadingComponent = () => {
    const _controller: AbortController = new AbortController();

    const _pathName: string = usePathname();
    const _router: AppRouterInstance = useRouter();

    /**
     * The function `_requestTimeout` sets a timeout of 10 seconds and then aborts a controller.
     */
    const _requestTimeout = () => {
        setTimeout(() => {
            _controller.abort();
        }, 10000);
    }

    /**
     * The function `redirectToUrl` fetches data from an API endpoint based on a URL ID, and then
     * redirects the user to the full URL obtained from the API response.
     */
    const redirectToUrl = async () => {
        _requestTimeout();
        try {
            /* The line `let _urlId: string = _pathName.slice(_pathName.lastIndexOf('/') + 1);` is
            extracting the URL ID from the current pathname. */
            let _urlId: string = _pathName.slice(_pathName.lastIndexOf('/') + 1);

            /* The line `const res = await fetch(`/api/sites?url_id=`, { signal:
            controller.signal });` is making a GET request to an API endpoint `/api/sites` with a
            query parameter `url_id` set to the value of `_urlId`. The `controller.signal` is used to
            provide an abort signal to the fetch request, allowing it to be cancelled if needed. */
            const res = await fetch(`/api/sites?url_id=${_urlId}`, { signal: _controller.signal });

            /* `const data = await res.json();` is parsing the response from the API endpoint as JSON
            and storing it in the `data` variable. The `res.json()` method returns a promise that
            resolves with the JSON representation of the response body. By using `await`, the code
            waits for the promise to resolve and then assigns the parsed JSON data to the `data`
            variable. */
            const data = await res.json();

            /* The line `_router.push(data.sites.full_url.startsWith("https://") ||
            data.sites.full_url.startsWith("http://") ? data.sites.full_url :
            `http://${data.sites.full_url}`)` is redirecting the user to a specific URL. */
            _router.push(data.sites.full_url.startsWith("https://") || data.sites.full_url.startsWith("http://") ? data.sites.full_url : `http://${data.sites.full_url}`)

        } catch (error) {
            console.log(error);

            /* The line `_router.push(`http://${window.location.hostname}`);` is redirecting the user
            to the homepage of the current website. It constructs a URL using the
            `window.location.hostname` property, which represents the hostname (domain) of the
            current URL. By pushing this URL to the router, the user will be redirected to the
            homepage of the website. */
            _router.push(`http://${window.location.hostname}`);
        }
    }

    /* The `useEffect` hook is used to perform side effects in functional components. In this case, the
    `useEffect` hook is being used to call the `redirectToUrl` function when the component is
    mounted. This means that when the component is rendered, the `redirectToUrl` function will be
    executed, which will initiate the process of redirecting the user to a specific URL based on the
    URL ID provided. */
    useEffect(() => {
        redirectToUrl();
    })

    return (
        <>
            <div className="bg-black flex justify-center items-center h-[100vh]">
                <div className="lds-hourglass relative inline-block h-20 w-20"></div>
            </div>
        </>
    )
}

export default LoadingComponent;