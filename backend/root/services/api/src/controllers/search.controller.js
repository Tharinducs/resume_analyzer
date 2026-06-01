import { get } from "@ra/shared";
import { searchAll } from "../services/search.service.js";

export const globalSearch = async (req, res) => {
  const userId = get(req, "user.id", null);
  const query = get(req, "query.q", "").trim();

  if (!userId) return res.status(401).json({ message: "Not authenticated" });

  try {
    const results = await searchAll(userId, query);
    return res.status(200).json({ code: "SEARCH_SUC", ...results });
  } catch (err) {
    console.error("Search error:", err);
    return res.status(500).json({ code: "SEARCH_FAILED", message: err.message });
  }
};
