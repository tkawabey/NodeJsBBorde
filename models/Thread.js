
// mongooseモジュールを使用する宣言を行います
const mongoose = require("mongoose");

// テーブルのスキーマを定義します。
const ThreadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 20,
  },
  content: {
    type: String,
    required: true,
  },
});

// ../server.jsで使用するので、エクスポートします。
module.exports = mongoose.model("Thread", ThreadSchema);