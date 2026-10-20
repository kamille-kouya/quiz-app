// 問題データ（answer は正解の choices インデックス）
const questions = [
  {
    question: "うるう年ではない1年は何日？",
    choices: ["360日", "364日", "365日", "366日"],
    answer: 2
  },
  {
    question: "日本で一番高い山はどれ？",
    choices: ["北岳", "富士山", "槍ヶ岳", "御嶽山"],
    answer: 1
  },
  {
    question: "1ダースは何個？",
    choices: ["10個", "12個", "20個", "24個"],
    answer: 1
  },
  {
    question: "1気圧のもとで水が沸騰する温度はおよそ何℃？",
    choices: ["50℃", "80℃", "100℃", "120℃"],
    answer: 2
  },
  {
    question: "太陽系で太陽に一番近い惑星はどれ？",
    choices: ["金星", "地球", "火星", "水星"],
    answer: 3
  },
  {
    question: "日本の国会は、衆議院と何で構成されている？",
    choices: ["貴族院", "参議院", "元老院", "枢密院"],
    answer: 1
  },
  {
    question: "1時間は何秒？",
    choices: ["60秒", "600秒", "3600秒", "6000秒"],
    answer: 2
  },
  {
    question: "日本の都道府県の数はいくつ？",
    choices: ["43", "45", "47", "49"],
    answer: 2
  },
  {
    question: "信号機で「止まれ」を意味する色はどれ？",
    choices: ["青", "黄", "赤", "白"],
    answer: 2
  },
  {
    question: "夏季オリンピックは原則として何年ごとに開催される？",
    choices: ["2年", "3年", "4年", "5年"],
    answer: 2
  }
];

// DOM要素の取得
const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");
const progressEl = document.querySelector("#progress");
const questionEl = document.querySelector("#question");
const choicesEl = document.querySelector("#choices");
const feedbackEl = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-button");
const retryButton = document.querySelector("#retry-button");
const scoreEl = document.querySelector("#score");

let currentIndex = 0;
let score = 0;

// クイズを最初から始める
function startQuiz() {
  currentIndex = 0;
  score = 0;
  resultScreen.hidden = true;
  quizScreen.hidden = false;
  showQuestion();
}

// 現在の問題を表示する
function showQuestion() {
  const current = questions[currentIndex];

  progressEl.textContent = `第${currentIndex + 1}問 / 全${questions.length}問`;
  questionEl.textContent = current.question;
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  nextButton.hidden = true;
  choicesEl.innerHTML = "";

  current.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = "choice";
    button.textContent = choice;
    button.addEventListener("click", () => selectAnswer(index));
    choicesEl.appendChild(button);
  });
}

// 回答を判定してフィードバックを表示する
function selectAnswer(selectedIndex) {
  const current = questions[currentIndex];
  const buttons = choicesEl.querySelectorAll(".choice");
  const isCorrect = selectedIndex === current.answer;

  // 回答後は選択肢を押せないようにする
  buttons.forEach((button) => {
    button.disabled = true;
  });

  // 正解の選択肢は常に緑で示す
  buttons[current.answer].classList.add("correct");

  if (isCorrect) {
    score++;
    feedbackEl.textContent = "⭕ 正解！";
    feedbackEl.classList.add("correct");
  } else {
    buttons[selectedIndex].classList.add("wrong");
    feedbackEl.textContent = `❌ 不正解… 正解は「${current.choices[current.answer]}」`;
    feedbackEl.classList.add("wrong");
  }

  // 最終問題ならボタンの文言を変える
  const isLast = currentIndex === questions.length - 1;
  nextButton.textContent = isLast ? "結果を見る" : "次の問題へ";
  nextButton.hidden = false;
}

// 次の問題へ進む、または結果を表示する
function goNext() {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// 結果画面を表示する
function showResult() {
  quizScreen.hidden = true;
  resultScreen.hidden = false;
  scoreEl.textContent = `${questions.length}問中${score}問正解`;
}

nextButton.addEventListener("click", goNext);
retryButton.addEventListener("click", startQuiz);

startQuiz();
