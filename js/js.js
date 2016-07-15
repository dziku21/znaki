var signs = "qwertyuioplkjhgfdsamnbvcxzZXCVBNMLKJHGFDSAPOIUYTREWQ"; 
var polskie = "ęóąśłżźćń";
var cyfry = "0123456789";
var znaki = "!@#$%^&*()";




var tabela = [signs];   
var counterTabela = 0;



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
	//Sprawdza czy wyświetlić alert 
	if (displayAlert()) {
		checked = 0;
		tabela = [signs];
		return alert("Długość tekstu przy zaznaczonych opcjach dodatkowych musi być dłuższa");	
    }

    console.log(tabela);
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
	spacja = document.getElementById("spacja").value;


	if (document.getElementById("polskie").checked ){
		checked +=1;
		tabela.push(polskie);
	}
	if (document.getElementById("liczby").checked ){
		checked +=1;
		tabela.push(cyfry);
	}
	if (document.getElementById("znaki").checked ){
		checked +=1;
		tabela.push(znaki);
	} 
	
	if (checked>0 && checked >= number) {
		return true;
	} else {
		return false;
	}
}