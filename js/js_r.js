var letter = "qwertyuioplkjhgfdsamnbvcxzZXCVBNMLKJHGFDSAPOIUYTREWQ"; 
var space = " ";
var polish = "ęóąśłżźćń";
var digits = "0123456789";
var special = "!@#$%^&*()";

var tableWithSigns = [ letter, space, polish, digits, special ] ; 
var procentTable =   [0.6, 0.1, 0.1, 0.1, 0.1];

var mainTable = [];  // tablica z indeksami zaznaczonych checboxów.  
var counterTable = 0;
var checked = 0; 
var numberOfSigns;

function generateText() {
	//Sprawdza czy wyświetlić alert, a jak tak to jaki
	displayAlert();

    console.log(mainTable);
    var answer = "";

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
    		// tutaj główna funkcja programu . 
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

    		answer= answer.split(""); 
    		console.log("tablica przed mieszaniem "+ answer);
    		
    		answer2 = shuffleArray(answer);

    		
    		console.log("tablica po mieszaniu " + answer); 
    		answer = generateString(answer2); 
	}

	document.getElementById("generatedText").value = answer;
	checked = 0;
	mainTable  = [];

}
//var list = [1,2,3];
//console.log(list.sort(function() { Math.random() - 0.5 })); // [2,1,3]
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
		console.log("suma po dodatkowym dodawaniu "+ sum);
		console.log("tablica ze znakami dla poszczególnych grup po obróbce  " + tableWithNumbersOfSign);

		return tableWithNumbersOfSign;
}


function generateSign(index) {
	var signs = tableWithSigns[index];
	console.log(signs);
	var index = Math.floor(Math.random() * signs.length);
	return signs[index];
}

function displayAlert() {
	
	numberOfSigns = document.getElementById("textlength").value;

	if (document.getElementById("letter").checked ){
		checked +=1;
		mainTable.push(0);
	}
	if (document.getElementById("space").checked ){
		checked +=1;
		mainTable.push(1);
	}
	if (document.getElementById("polskie").checked ){
		checked +=1;
		mainTable.push(2);
	}
	if (document.getElementById("liczby").checked ){
		checked +=1;
		mainTable.push(3);
	}
	if (document.getElementById("znaki").checked ){
		checked +=1;
		mainTable.push(4);
	} 
	if (checked>0 && checked > numberOfSigns) {
		return alert("Długość tekstu przy zaznaczonych opcjach musi być dłuższa");
	} else if(checked==0){
		return alert("Zaznacz przynajmniej jedną opcję");;
	} 
}

function getSignNumber(word) {
	
	var signsNumber = word.length;
	console.log(signsNumber);
	document.getElementById("ilosc").textContent = signsNumber;
	console.log(word);

}