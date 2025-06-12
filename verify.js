// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDtMRDJ9QCGNBMUMCmW0BCiwd7mdsKCT8M",
    authDomain: "strathmart.firebaseapp.com",
    projectId: "strathmart",
    storageBucket: "strathmart.firebasestorage.app",
    messagingSenderId: "305170219362",
    appId: "1:305170219362:web:785dcefd3cbfd756726c3b",
    measurementId: "G-0X1YDWBVXY"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const email = document.getElementById('email').value;
  const submit = document.getElementById('submit');

  submit.addEventListener("click",function(event){
    event.preventDefault()
    alert(5)
  })