import jwt from "jsonwebtoken";
import ApiKey from "../models.js";

export function auth(req, res, next) {
    const header = req.headers.authorization;
    if (!header){
        return res.status(401).json({ error: "No token" });
    }
    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ error: "Invalid token" });
    }
}




export async function apiKeyAuth(req, res, next) {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
        return res.status(401).json({ error: "API key missing" });
    }

    try {

        const keyDoc = await ApiKey.findOne({
            key: apiKey,
            active: true
        });
        console.log("API Key Document:", keyDoc);
                
        if (!keyDoc) {
            return res.status(403).json({ error: "Invalid API key" });
        }


        // req.apiClient = {
        //     id: keyDoc._id,
        //     // client: keyDoc.client,
        //     permissions: keyDoc.permissions
        // };

        next();

    } catch (err) {
        console.error("API key auth error:", err);
        return res.status(500).json({ error: "Auth failed" });
    }
}