import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Your config
const firebaseConfig = {
  apiKey: "AIzaSyCY685VUp-3SDJZcfbIwRFD20QXKIvyuD8",
  authDomain: "langgo-4bb3a.firebaseapp.com",
  projectId: "langgo-4bb3a",
  storageBucket: "langgo-4bb3a.appspot.com",
  messagingSenderId: "741690694912",
  appId: "1:741690694912:web:027b883b74e5fe217ca7e5",
  measurementId: "G-ZFSJ67X5WF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("✅ Firebase initialized successfully");


window.addWord = async () => {
  const en = document.getElementById("wordEn")?.value.trim();
  const ms = document.getElementById("wordMs")?.value.trim();
  const ko = document.getElementById("wordKo")?.value.trim();

  if (en && ms && ko) {
    await addDoc(collection(db, "translations"), { en, ms, ko });
    alert("Word added!");
    document.getElementById("wordEn").value = "";
    document.getElementById("wordMs").value = "";
    document.getElementById("wordKo").value = "";
  } else {
    alert("Please fill all fields!");
  }
};

window.translateText = async () => {
  const input = document.getElementById("inputText")?.value.toLowerCase().trim();
  const from = document.getElementById("fromLang")?.value;
  const to = document.getElementById("toLang")?.value;
  const output = document.getElementById("translatedWords");
  output.innerHTML = "";

  if (!input) return;

  const words = input.split(" ");
  const snapshot = await getDocs(collection(db, "translations"));

  words.forEach((word) => {
    let found = false;
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data[from]?.toLowerCase() === word) {
        const span = document.createElement("span");
        span.textContent = data[to] || "(?)";
        output.appendChild(span);
        found = true;
      }
    });

    if (!found) {
      const span = document.createElement("span");
      span.textContent = "(?)";
      output.appendChild(span);
    }
  });
};
