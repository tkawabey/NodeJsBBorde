/*
    クライアントサイドのスクリプトの実装

*/

// data fetching
const inputTextDOM = document.getElementById("inputTitle");
const inputContentDOM = document.getElementById("inputContent");
//formDomを追加する。
const formDOM = document.querySelector(".form-section");
// スレッド一覧を表示する<div>タグを取得します。
const threadSectionDOM = document.querySelector(".thread-section");
let inputText = "";
let contentText = "";

//スレッド一覧を取得するWebAIPをコールし、
// 一覧をJSONデータで取得し画面を更新する
// 関数
const getAllThreads = async () => {
  try {
    // WebAPI GET("/api/v1/threads") をコールし、スレッド一覧を取得します。
    let allThreads = await axios.get("/api/v1/threads");
    console.log(allThreads);
    // 分割代入でデータだけ取り出します。
    let { data } = allThreads;
    //出力
    innerTextThreads = data
        // スレッドデータを一件づつ取り出す。
      .map((thread) => {
        // 分割代入で、titleとcontentだけ取り出す
        const { title, content } = thread;
        console.log(title);
        // 一件のスレッドデータの<div>タグのデータを作成
        return `
      <div class="single-thread">
          <h3>${title}</h3>
          <p>${content}</p>
        </div>
      `;
      })
      .join("");
    //挿入
    threadSectionDOM.innerHTML = innerTextThreads;
  } catch (err) {
    console.log(err);
  }
};

// getAllThreads関数をコールし、初期表示を行います。
getAllThreads();

//入力項目のDOMに対して、リスナーをインプリメントして、
// 変更がある毎に変数にセットするようにします。
inputTextDOM.addEventListener("change", (e) => {
  //   console.log(e.target.value);
  inputText = e.target.value;
});
inputContentDOM.addEventListener("change", (e) => {
  contentText = e.target.value;
});
// Submitボタンのリスナーをインプリメントして、
// ボタンがプッシュされた時に、スレッドを追する加WebAPIをコールします。
formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (inputText && inputContent) {
    //postメソッドで送信する。

    try {
      // server.jsで実装されている、スレッドを追する加WebAPI（POST）
      // をコールします。
      await axios.post("/ap1/v1/thread", {
        title: inputText,
        content: contentText,
      });
      // スレッドの一覧を取得して、最新の情報に画面を更新します。
      getAllThreads();
    } catch (err) {
      console.log(err);
    }

    //投稿したらinputのvalueを削除
    inputText = "";
    contentText = "";
    inputTextDOM.value = "";
    inputContentDOM.value = "";
  } else {
    console.log("error");
  }
});