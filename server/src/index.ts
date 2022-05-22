import path from 'path';
import express from "express";
import { app as webapp } from "./controllers/web";
import { app as restapp } from "./controllers/rest";

const PORT = process.env.PORT || 3001;

const app = express();
app.use("/", webapp);
app.use("/datclient", webapp);
app.use("/api", restapp);

if (process.env.NODE_ENV === 'production') {
    if (process.env.STEADYBBS_SERVE_FRONTEND) {
        const frontendRoot = path.join(__dirname, '../../client/build');
        app.use(express.static(frontendRoot));
        app.get("/*", (req, res) => {
            res.sendFile(path.join(frontendRoot, 'index.html'));
        });        
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const server = app.listen(PORT, () => console.log(`Steady BBS Server running on Port ${PORT}`));
