let currentQuestion = 0;
let score = 0;
let hintsLeft = 2;
let questions = [
   {
      "question": "1. What is Mr. Meldrum's favourite video game?",
      "a": "Minecraft",
      "b": "Red Dead Redemption 2",
      "c": "Skyrim",
      "d": "Final Fantasy VII",
      "image":"quizimages/q1.jpg",
      "answer": "b",
      "remove1": "c",
      "remove2": "d"
   },
   {
      "question": '2. How does Mr.Lansdell pronounce the word "vase" ',
      "a": "vahsAE",
      "b": "vAHs",
      "c": "vOse",
      "d": "vAse",
      "image":"quizimages/q2.jpg",
      "answer": "b",
      "remove1": "a",
      "remove2": "c"
   },
   {
      "question": "3. What is Mr. Johnson's favourite Star Wars movie?",
      "a": "Revenge of the Sith",
      "b": "A New Hope",
      "c": "The Empire Strikes Back",
      "d": "Return of the Jedi",
      "image":"quizimages/q3.jpg",
      "answer": "d",
      "remove1": "a",
      "remove2": "b"
   },
   {
      "question": "4. How does Mr. Williams usually get to school?",
      "a": "By bus",
      "b": "By car",
      "c": "By walking",
      "d": "By bike",
      "image":"quizimages/q4.jpg",
      "answer": "d",
      "remove1": "a",
      "remove2": "c"
   },
   {
      "question": "5. How many subscribers does Mr. Boorman's Channel have?",
      "a": "150k",
      "b": "160k",
      "c": "170k",
      "d": "180k",
      "image":"quizimages/q5.jpg",
      "answer": "c",
      "remove1": "a",
      "remove2": "b"
   },
   {
      "question": "6. What is Mr. Meldrum's most prevelant opinion on badminton?",
      "a": "Badminton is boring to watch",
      "b": "Badminton is not a sport",
      "c": "Badminton is fun to watch",
      "d": "Mr. Meldrum doesn't have any opinions on badminton",
      "image":"quizimages/q6.jpg",
      "answer": "b",
      "remove1": "c",
      "remove2": "d"
   },
   {
      "question": '7. In the "Quast fights Meldrum" debate, it was concluded that...',
      "a": "Mr. Quast would win.",
      "b": "Mr. Meldrum would win",
      "c": "Mr. Quast and Mr. Meldrum would tie.",
      "d": 'This debate was declared "inappropriate" by Judge Williams and did not happen',
      "image":"quizimages/q7.jpg",
      "answer": "a",
      "remove1": "b",
      "remove2": "d"
   },
   {
      "question": "8. What hockey team does Mr. Williams root for? ",
      "a": "Toronto Maple Leafs",
      "b": "Edmonton Oilers",
      "c": "Montreal Canadiens",
      "d": "Vancouver Canucks",
      "image":"quizimages/q8.jpg",
      "answer": "d",
      "remove1": "b",
      "remove2": "c"
   },
   {
      "question": "9. Mr. Johnson will let a student add him on Linkdin when...",
      "a": "They have graduated.",
      "b": "They have entered the grad program.",
      "c": "They have managed to find it.",
      "d": "They have completed one of his classes.",
      "image":"quizimages/q9.jpg",
      "answer": "a",
      "remove1": "b",
      "remove2": "c"
   },
   {
      "question": "10. During what years was Mr. Boorman a computer camp leader?",
      "a": "2007 - 2017",
      "b": "2009 - 2013",
      "c": "2006 - 2019",
      "d": "2011 - 2020",
      "image":"quizimages/q10.jpg",
      "answer": "c",
      "remove1": "b",
      "remove2": "d"
   },
 ];

 if ('serviceWorker' in navigator) {
   navigator.serviceWorker.register('/sw.js');
 }

function loadQuestion() {
   
   // close light box for first question
   if (currentQuestion == 0) {
      closeLightBox();
   }

   //make previously hidden options visible
   document.getElementById("a").style.visibility = "visible";
   document.getElementById("b").style.visibility = "visible";
   document.getElementById("c").style.visibility = "visible";
   document.getElementById("d").style.visibility = "visible";
   
   // load the image
   let img = document.getElementById("image");
   img.src = questions[currentQuestion].image;
   img.style.maxWidth = "70vh";
   img.style.maxHeight = "80vh";
   
   // load the question and answers
   document.getElementById("question").innerHTML = questions[currentQuestion].question;
   document.getElementById("a").innerHTML = "A. " + questions[currentQuestion].a;
   document.getElementById("b").innerHTML = "B. " + questions[currentQuestion].b;
   document.getElementById("c").innerHTML = "C. " + questions[currentQuestion].c;
   document.getElementById("d").innerHTML = "D. " + questions[currentQuestion].d;
} // loadQuestion


function markIt(ans) {
   
   let message = "";

   if(currentQuestion+2 <= questions.length){
      console.log(currentQuestion+2);
      console.log(questions.length);
      if (ans == questions[currentQuestion].answer) {
         
         // add 1 to score
         score++;
         
         // display score 
         document.getElementById("score").innerHTML = "Score " + score + " / " + questions.length;
         
         message = "Correct! Your current score is <br>" + score + " / " + questions.length;
      } else {
         message = "Incorrect! Your current score is <br>" + score + " / " + questions.length; 
      } // else
   }
   
   // move to the next question
   if(currentQuestion <= questions.length){
      currentQuestion++;
   }
   if (currentQuestion >= questions.length) {
      if(score === 0){
         message = "You finished the quiz with a total of " + score + " / " + questions.length + ".<br> With two 50/50s you'd think you'd guess ONE right.";
      }
      else if(score >= 1 && score <= 4){
         message = "You finished the quiz with a total of <br>" + score + " / " + questions.length + ".<br> Wow. NOT poggers. Try a little harder next time.";
      }
      else if(score >= 5 && score <= 8 ){
         message = "You finished the quiz with a total of <br>" + score + " / " + questions.length + ".<br> Eh... that's... a passing grade. I guess.";
      }
      else{
         message = "You finished the quiz with a total of <br>" + score + " / " + questions.length + ".<br> Nice! That's an A for you.";
      }
   } else {
      loadQuestion();
   }
   
   // show the lightbox
   document.getElementById("lightbox").style.display = "block";
   document.getElementById("message").innerHTML = message;

}  // markIt

function closeLightBox() {
   document.getElementById("lightbox").style.display = "none";
   document.getElementById("lightbox2").style.display = "none";
} // closeLightbox
 
function info(){
   document.getElementById("lightbox2").style.display = "block";
}
 
function hint(){

   if(hintsLeft > 0){
      //remove a hint
      hintsLeft --;

      //display hints left
      document.getElementById("hintsDisplay").innerHTML = "Hints Left: " + hintsLeft;

      //takes the 2 chosen options and removes them
      document.getElementById(questions[currentQuestion].remove1).style.visibility = "hidden";
      document.getElementById(questions[currentQuestion].remove2).style.visibility = "hidden";
   }
   else{
      message = "You've run out of hints!"
      document.getElementById("lightbox").style.display = "block";
      document.getElementById("message").innerHTML = message;
   }
}

 
 
 
 
 
 
 
   
