import { db } from "../db.js";
import { nanoid } from 'nanoid';

export const addUrl = (req, res) => {
    const q =
        "INSERT INTO urls(`long_url`, `short_url_code`) VALUES(?)";

    const generatedCode = nanoid(6);

    const values = [
        req.body.long_url,
        generatedCode,
    ];

    db.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json({ code: generatedCode });
    })
}

export const getLongUrl = (req, res) => {
    const q = "SELECT long_url FROM urls WHERE short_url_code = ?";

    const shortUrlCode = req.params.short_url_code;

    db.query(q, [shortUrlCode], (err, data) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json(err);
        }

        if (data.length === 0) {
            console.log("No URL found for code:", shortUrlCode);
            return res.status(404).json({ message: "URL not found" });
        }

        let longUrl = data[0].long_url;

        if (!longUrl.startsWith("http://") && !longUrl.startsWith("https://")) {
            longUrl = `http://${longUrl}`;
        }

        console.log("Returning long_url:", longUrl);
        return res.json({ long_url: longUrl });
    });
};