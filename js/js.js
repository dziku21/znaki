var letter = "qwertyuioplkjhgfdsamnbvcxzZXCVBNMLKJHGFDSAPOIUYTREWQ"; 
var space = " ";
var polskie = "ęóąśłżźćń";
var cyfry = "0123456789";
var znaki = "!@#$%^&*()";




var mainTable = [];   
var counterTable = 0;



var checked = 0; 
var number;
var spacja ;

function getSignNumber(word) {
	
	var signsNumber = word.length;
	console.log(signsNumber);
	document.getElementById("ilosc").textContent = signsNumber;
	console.log(word);
}
//geeneruje znak z tablicy tabela której elementami są dane powiązane z checboxami.
function generateSign(number1) {
	var zbiór = tabela[number1]
    randomIndex = Math.random() * zbiór.length;
    randomSign = Math.floor(randomIndex);
	return zbiór[randomSign];
}

function generateText() {
	//Sprawdza czy wyświetlić alert, a jak tak to jaki
	var alertNumber = displayAlert();

	if ( alertNumber == 1) {
		 alert("Długość tekstu przy zaznaczonych opcjach musi być dłuższa");	
    }  else if ( alertNumber == 2) {
    	alert("Zaznacz przynajmniej jedną opcję");
    } else {
    	alertNumber =4;
    }

    console.log(mainTable);
	console.log(checked);
	console.log("number "+ number);
	
	var sentence ="";
	var counter = 0;
	for(var i=0; i< number; i++) {
		 if (counter < spacja || spacja == 0) {
		 	if ( counterTabela < tabela.length) {
				sentence += generateSign(counterTabela);
				counter++;
				counterTabela++;
			} 
		    if (counterTabela == tabela.length) {
				counterTabela =  0;
			}		
			
		}  else {
		    sentence += " ";
			counter=0;
		}	
	}
	//document.getElementById("generatedText").value = number + " "+ spacja + " " + signs.length;
	
	document.getElementById("generatedText").value = sentence;
	
	checked = 0;
	tabela  = [signs];
}

function displayAlert() {
	
	number = document.getElementById("textlength").value;

	if (document.getElementById("letter").checked ){
		checked +=1;
		mainTable.push(letter);
	}

	if (document.getElementById("space").checked ){
		checked +=1;
		mainTable.push(space);
	}


	if (document.getElementById("polskie").checked ){
		checked +=1;
		mainTable.push(polskie);
	}
	if (document.getElementById("liczby").checked ){
		checked +=1;
		mainTable.push(cyfry);
	}
	if (document.getElementById("znaki").checked ){
		checked +=1;
		mainTable.push(znaki);
	} 
	
	if (checked>0 && checked > number) {
		return 1;
	} else if(checked==0){
		return 2;
	} else {
		return 3;
	}
}