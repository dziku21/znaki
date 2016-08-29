var smallLeter ="qwertyuioplkjhgfdsamnbvcxz";
var bigLetter = "ZXCVBNMLKJHGFDSAPOIUYTREWQ";     
var space = " ";
var polish = "ęóąśłżźćń";
var digits = "0123456789";
var special = "!@#$%^&*()";
var tableWithSigns = [ smallLeter, bigLetter, space, polish, digits, special ] ; 
var procentTable =   [0.4, 0.2, 0.1, 0.1, 0.1, 0.1]; // dla każdego checboxa przypisana jest procentowa wartość znaków w ciągu. 
var mainTable = [];  // tablica z indeksami zaznaczonych checboxów.  
var counterTable = 0;
var checked = 0; 
var numberOfSigns;
var run;



function generateText() {	
	//run = true;
	displayAlert();
 	if (checked == 0  ) {
 		return ;
 	}
	
    var answer = "";
	//przypadek gdy liczba zaznaczonych checkboxów == liczba znaków do wygenerowania
    if (mainTable.length == numberOfSigns) {
    	var copyMainTable = [];
    	for (i=0; i<mainTable.length; i++) {
    		copyMainTable.push(i);
    	}
    	var IndexTableWithSign;
    	for (i=0; i<mainTable.length; i++){
    		randomIndexCopyTable = Math.floor(Math.random() * copyMainTable.length);
    		randomIndex1 = copyMainTable[randomIndexCopyTable];    		
    		indexTableWithSign = mainTable[randomIndex1];
    		copyMainTable.splice(randomIndexCopyTable, 1);
    		answer += generateSign(indexTableWithSign); 
    	} 
    } else if (mainTable.length < numberOfSigns) {
    		// tutaj główna funkcja programu . ( przypdadek najcześciej wywoływany)
    		var NumbersForTableWithSigns = generateNumbersForTableWithSigns(mainTable , numberOfSigns); 
    		while (numberOfSigns > 0) {
    			index = Math.floor(Math.random() * NumbersForTableWithSigns.length);
    			console.log(NumbersForTableWithSigns);
    			if (NumbersForTableWithSigns[index] > 0) {
    				answer += generateSign(mainTable[index]);
    				NumbersForTableWithSigns[index] -=1;
    				numberOfSigns-- ;
    			} 
    		}
    		answer= answer.split(""); //tworzy z utworzonego ciągu tablice
    		answer2 = shuffleArray(answer);// miszanie tablicy
    		answer = generateString(answer2); 
	}
	$("#generatedText_js").val(answer);
	checked = 0;
	mainTable  = [];
}

function generateString(array) {
	answer = "";
	for (i=0; i<array.length; i++) {
		answer += array[i];
	}
	return answer;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    console.log(array);
    return array;
}

function generateNumbersForTableWithSigns(table, totalnumbers) {
// generuje tablice określająca ile znaków dla każdego checboxa 
	var tableWithNumbersOfSign = [];
	for (i=0; i<table.length; i++) {
		number = procentTable[table[i]] * totalnumbers;
		if (number < 1) {
			number = 1;
		} else if ((number*10)%10 >= 5) {
			number = Math.ceil(number);
		} else if ((number*10)%10 < 5) {
			number = Math.floor(number)		
		}
		tableWithNumbersOfSign.push(number); 
		console.log("tablica ze znakami dla poszczególnych grup bez obróbki  " + tableWithNumbersOfSign);
	}
	var sum = 0; 
	for (i=0; i<tableWithNumbersOfSign.length; i++) {
			sum += tableWithNumbersOfSign[i];
	}
	while (sum != totalnumbers ){
		for(i=0; i<tableWithNumbersOfSign.length; i++){
			if ( sum == totalnumbers) {
				break;
			}else if( sum > totalnumbers) {
				tableWithNumbersOfSign[i]  -=  1;
				if(tableWithNumbersOfSign[i] < 1){
					continue;
				}
					sum -= 1;
				} else {
					tableWithNumbersOfSign[i]  += 1;
					sum +=1;
				} 
			}
		}
		//console.log("suma po dodatkowym dodawaniu "+ sum);
		//console.log("tablica ze znakami dla poszczególnych grup po obróbce  " + tableWithNumbersOfSign);
		return tableWithNumbersOfSign;
}

function generateSign(index) {
	var signs = tableWithSigns[index];
	var index = Math.floor(Math.random() * signs.length);
	return signs[index];
}

function displayAlert() {
	//Sprawdza czy wyświetlić alert, a jak tak to jaki,
	// Sprawdza, które checboxy zostały zazanoczne i które dodać do głównej tablicy.
	numberOfSigns = document.getElementById("textlength_js").value;

	if (document.getElementById("smallLetter_js").checked ){
		checked +=1;
		mainTable.push(0);
	}
	if (document.getElementById("bigLetter_js").checked ){
		checked +=1;
		mainTable.push(1);
	}
	if (document.getElementById("space_js").checked ){
		checked +=1;
		mainTable.push(2);
	}
	if (document.getElementById("polish_js").checked ){
		checked +=1;
		mainTable.push(3);
	}
	if (document.getElementById("numbers_js").checked ){
		checked +=1;
		mainTable.push(4);
	}
	if (document.getElementById("signs_js").checked ){
		checked +=1;
		mainTable.push(5);
	} 

	

	var message = document.getElementById("error");
	var message1 = document.getElementById("error2");

	if(checked==0){
		message.textContent = "Zaznacz przynajmniej jedną opcję";
		message.setAttribute("class", "error");
	} else {
		message.textContent="";
	}


	if (!isInt(numberOfSigns) || numberOfSigns<1) {
		message1.textContent = "Wprowadź liczbę całkowitą dodatnią";
		message1.setAttribute("class", "error");
		checked = 0;
		mainTable =[];
	} else if (numberOfSigns > 12000) {
		message1.textContent = "Maksymalna liczba znaków to 12000";
		message1.setAttribute("class", "error");
		checked = 0;
		mainTable =[];
	} else if ((checked>0 && checked > numberOfSigns) || (numberOfSigns<0)) {
		message1.textContent = "Ilość znaków powinna być większa";
		message1.setAttribute("class", "error");
		checked = 0;
		mainTable =[];
	} else {
		message1.textContent="";
	}


}


function isInt(value) {
  return !isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10) && value > 0);
}

var buttonToCopy = document.getElementById("copyText");
buttonToCopy.addEventListener('click', function() {
  var copyInput = document.querySelector("#generatedText_js");
  copyInput.select();
  var successful = document.execCommand('copy');
 });  

 var buttonText =document.getElementById("buttonText");
 buttonText.addEventListener('click', generateText); 