import { db } from "../db.js";
import { nanoid } from 'nanoid';

export const addUrl = (req, res) => {
    const generatedCode = nanoid(6);
    const q = "INSERT INTO urls (long_url, short_url_code) VALUES ($1, $2) RETURNING *";
  
    const values = [
      req.body.long_url,
      generatedCode, 
    ];
  
    db.query(q, values)
      .then(result => {
        return res.status(200).json({ code: result.rows[0].short_url_code });
      })
      .catch((err) => {
        console.error("Erro ao criar URL encurtada:", err.message);
        return res.status(500).json({ error: "Erro ao criar URL encurtada." });
      });
  };

export const getLongUrl = (req, res) => {
    const shortUrlCode = req.params.short_url_code;

    const q = "SELECT long_url FROM urls WHERE short_url_code = $1";

    db.query(q, [shortUrlCode])
        .then(result => {
            if (result.rows.length === 0) {
                console.log("No URL found for code:", shortUrlCode);
                return res.status(404).json({ message: "URL not found" });
            }

            let longUrl = result.rows[0].long_url; 

            if (!longUrl.startsWith("http://") && !longUrl.startsWith("https://")) {
                longUrl = `http://${longUrl}`;
            }

            console.log("Returning long_url:", longUrl);
            return res.json({ long_url: longUrl });
        })
        .catch(err => {
            console.error("Database Error:", err);
            return res.status(500).json({ message: "Database Error", error: err.message });
        });
};