
// expressモジュールを使用する宣言を行います
const express = require("express");
// mongooseモジュールを使用する宣言を行います
const mongoose = require("mongoose");
// expressのインスタンスを作成
const app = express();
// dotenvモジュールを使用する宣言を行います
const dotenv = require("dotenv").config();

// ./models/Thread.jsを使用するように宣言します。
const Thread = require("./models/Thread");



console.log(process.env.MONGODB_APPCODE);

// MongoDBに接続します。
mongoose
    // connect に指定する引数は、MongoDBのサイトからアプリケーションコードをコピー&ペースト
    // します。
    // <username>　<password>　<DB Name>　は適切な値に書き換えてください。
    // 例）mongodb+srv://user01:passwd123@cluster0.kjn8ndp.mongodb.net/bbort?retryWrites=true&w=majority
    .connect(process.env.MONGODB_APPCODE)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err));

// リッスンを開始するポート番号
const PORT = 8000;

// 静的なファイルを扱うように、命令文を記載します
// publicフォルダの下に静的なHTMLファイルがあることを示しています
app.use(express.static("public"))
//　jsonデータでクライアントとデータのやり取りできるように宣言します
app.use(express.json());

//　スレッド一案を取得して、クライアントのjsonデータで返します。
app.get("/api/v1/threads", async (req, res) => {
    try {
        // スキーマクラス（mongoose.Schema）のfindクラスをコースして、すべて
        // のアイテムを表示します
        const allThreads = await Thread.find({});
        // 取得したデータをクライアントに送信します。
        res.status(200).json(allThreads);
    } catch (err) {
        console.log(err);
    }
  });

//スレッドを追加するAPIを、POSTメソッドで実装します。
app.post("/ap1/v1/thread", async (req, res) => {
    try {
      // スキーマクラス（mongoose.Schema）のcreateメソッドをコールして、
      // アイテムを追加します。
      const createThread = await Thread.create(req.body);
      // 追加したアイテムを、クライアントに送信します。
      res.status(200).json(createThread);
    } catch (err) {
      console.log(err);
    }
  });


// サーバーを指定したポートでリッスン開始します。
app.listen(PORT, () => {
    console.log("listening on 8000");
} );

