   // Store the selected values globally
   var storedSignalType = "";
   var storedMorseCodeValue = "";
   var storedVoiceSignalValue = "";


   function showNextPage() {
       document.getElementById('page1').style.display = 'none';
       document.getElementById('page2').style.display = 'block';
    // const page1=document.querySelector('#page1')
    // const page2=document.querySelector('#page1')

    page1.target.style.display

    
   }
   function repeatPage() {
    // Hide the 'screen' div
    document.getElementById('screen').style.display = 'none';

    // Show the 'page2' div
    document.getElementById('page2').style.display = 'block';
}

   

//    const showingbutton = document.getElementById('showing-next-page');
//    showingbutton.classList.add('none')
//    showingbutton.classList.remove('block')
   // Get the parameters from the URL
   const urlParams = new URLSearchParams(window.location.search);
   const signalType = urlParams.get('type');
   const morseCodeValue = urlParams.get('morse');
   const voiceSignalValue = urlParams.get('voice');

   function sendMorseCode() {
       var morseCodeOutput = document.getElementById("morseCodeOutput");
       morseCodeOutput.innerHTML = storedSignalType + " signal sent: ";

       // Display the Morse code based on the stored signal type
       var morseInterval = setInterval(function () {
           morseCodeOutput.innerHTML += storedMorseCodeValue + " ";
       }, 1000); // Display the Morse code every 1000 milliseconds (1 second)

       // Stop after displaying the Morse code three times
       setTimeout(function () {
           clearInterval(morseInterval);
           setTimeout(function () {
             morseCodeOutput.innerHTML += "DE [CallSign] DE [CallSign] DE [CallSign]";
           },1000);
             
           

           // Show the buttons after displaying the Morse code
           setTimeout(function () {
            document.getElementById("sendMorseCode").style.display = "block";
           },1000);
           
           document.getElementById("sendVoiceSignal").style.display = "block";
       }, 3000); // Stop after 3000 milliseconds (3 seconds)

       // Hide the respective button after the output is displayed
       document.getElementById("sendMorseCode").style.display = "none";
       document.getElementById("morseCodeOutput").style.display = "block";
    
   }

   function sendVoiceSignal() {
    var voiceSignalOutput = document.getElementById("voiceSignalOutput");
    voiceSignalOutput.innerHTML = storedSignalType + " signal sent: ";

    // Display the voice signal based on the stored signal type
    var voiceInterval = setInterval(function () {
        voiceSignalOutput.innerHTML += storedVoiceSignalValue + " ";
        // Adding text-to-speech for the voice signal
        speakText(storedVoiceSignalValue);
    }, 1000); // Display the voice signal every 1000 milliseconds (1 second)

    // Stop after displaying the voice signal three times
    setTimeout(function () {
        clearInterval(voiceInterval);
        voiceSignalOutput.innerHTML += "<br>THIS IS [callsign of station] THIS IS [callsign of station] THIS IS [callsign of station]<br>";
        voiceSignalOutput.innerHTML += "My location is [Location]<br>";
        voiceSignalOutput.innerHTML += "I am experiencing [type of distress]<br>";
        voiceSignalOutput.innerHTML += "I require [type of assistance]";

        // Show the buttons after displaying the voice signal
        document.getElementById("sendMorseCode").style.display = "block";
        document.getElementById("sendVoiceSignal").style.display = "block";
    }, 3000); // Stop after 3000 milliseconds (3 seconds)

    // Hide the respective button after the output is displayed
    document.getElementById("sendVoiceSignal").style.display = "none";
    document.getElementById("voiceSignalOutput").style.display = "block";
}

   function speakText(text) {
       var speechSynthesis = window.speechSynthesis;
       var speechUtterance = new SpeechSynthesisUtterance(text);
       speechUtterance.onend = function () {
           // This function will be called after the completion of voice signal pronunciation
           console.log(storedSignalType + " pronunciation completed.");
           // You can add any additional logic here if needed
       };
       speechSynthesis.speak(speechUtterance);
   }

   function submitForm() {
       var inputNumber = document.getElementById('numberInput').value;
       storedSignalType = document.getElementById('numberInput').options[document.getElementById('numberInput').selectedIndex].text;

       // Update the values for each signal type
       switch (storedSignalType) {
           case 'Distress Signals':
               storedMorseCodeValue = 'SOS';
               storedVoiceSignalValue = 'MAYDAY';
               break;
           case 'Urgent Signals':
               storedMorseCodeValue = 'XXX';
               storedVoiceSignalValue = 'PAN';
               break;
           case 'Safety Sinals':
               storedMorseCodeValue = 'TTT';
               storedVoiceSignalValue = 'SECURITIE';
               break;
           case 'Test Signals':
               storedMorseCodeValue = 'VVV';
               storedVoiceSignalValue = '1,2,3,4,5';
               break;
           default:
               storedMorseCodeValue = '';
               storedVoiceSignalValue = '';
       }

       // Show the 'screen' div and pass parameters
       showScreen(storedSignalType, storedMorseCodeValue, storedVoiceSignalValue);
   }

   function showScreen(signalType, morseCodeValue, voiceSignalValue) {
       // Display the 'screen' div
       document.getElementById('page2').style.display = 'none';
       document.getElementById('screen').style.display = 'block';

       // Set parameters in the 'screen' div
       const morseCodeOutput = document.getElementById("morseCodeOutput");
       morseCodeOutput.innerHTML = signalType + " signal sent: " + morseCodeValue;

       const voiceSignalOutput = document.getElementById("voiceSignalOutput");
       voiceSignalOutput.innerHTML = signalType + " signal sent: " + voiceSignalValue;

       // Add any additional logic needed for the 'screen' div
   }