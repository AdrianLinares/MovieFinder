import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MovieFinder } from "./movieFinder";
import "./styles/finder.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <MovieFinder />
    </StrictMode>
);
