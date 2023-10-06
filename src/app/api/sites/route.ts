import Site from "@/services/models/sites";
import connectMongoDB from "@/services/utils/mongodb";

import { NextResponse } from "next/server";

/**
 * The function is an async function that handles a POST request by creating a new document in a
 * MongoDB collection with the provided full_url and url_id.
 * @param {Request} req - The `req` parameter is an object representing the incoming HTTP request. It
 * contains information such as the request method, headers, and body.
 * @returns a JSON response with the message "Link Created" and a status code of 201.
 */
async function POST(req: Request) {
    const { full_url, url_id } = await req.json();
    await connectMongoDB();
    await Site.create({ full_url, url_id });
    return NextResponse.json({ message: "Link Created" }, { status: 201 });
}

/**
 * The function is an asynchronous function that retrieves a site from a MongoDB database based
 * on a given URL ID.
 * @param {Request} req - The parameter `req` is of type `Request`, which represents an HTTP request.
 * It contains information about the request such as the URL, headers, and body. In this case, the
 * `req` parameter is used to extract the URL ID from the request URL.
 * @returns a JSON response containing the "sites" object.
 */
async function GET(req: Request) {
    let _givenUrlId: string = "0";
    _givenUrlId = req.url.substring(req.url.lastIndexOf('=') + 1);
    await connectMongoDB();
    const sites = await Site.findOne({ url_id: _givenUrlId });
    return NextResponse.json({ sites });
}

export { POST, GET };