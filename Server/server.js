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
        if(query.name === "1") return "현재 쿼리는 1임"
        return "현재 쿼리는 아마도 2임"
    }
    const data = returnData(oid,query)
        res.send(`oid는 ${oid}이고 ${data}`)
    }
    else {
        res.send(`oid는 ${oid}이고 query는 없음.`)
    }}
    catch {
        res.status(402).send("뭔가 에러임")
    }
})

app.use(cors());
app.use(express.json());
app.use("/api", testRouter);
app.use("/", main);