import express from "express";
import cors from "cors";
import { Router } from "express";

const app = express();
app.listen(8080, function () {
  console.log('listening on 8080')
}); 

const main = Router();
main.get("/", (req, res) => {
    res.send("root page");
}); 

const testRouter = Router();
testRouter.get("/:oid", async (req, res) => {
    try{const { oid } = req.params
    const query = req.query
    
    if(query.name){
        function returnData(oid, query) {
        if(query.name === "1") return "query is 1"
        return "query is maybe 2"
    }
        const data = returnData(oid,query)
        res.send(`oid is ${oid}, ${data}`)
    }
    else {
        res.send(`oid is ${oid}, there is no query.`)
    }}
    catch {
        res.status(402).send("something wrong")
    }
})

app.use(cors());
app.use(express.json());
app.use("/api", testRouter);
app.use("/", main);