

function calculate(){
    let splitTotalHistory = totalHistory.split(' ');
    let resultingNum = 0;
    
    console.log("index " ,splitTotalHistory.indexOf("*"))
    while (splitTotalHistory.indexOf("*") !=-1 || splitTotalHistory.indexOf("/") != -1){
        for(let i = 0;i< splitTotalHistory.length;i++){
            if(splitTotalHistory[i] === "*" || splitTotalHistory[i] === "/" ){
                numBefore = Number(splitTotalHistory[i-1]);
                numAfter = Number(splitTotalHistory[i+1]);
                
                if(splitTotalHistory[i] === "*"){
                    resultingNum = numBefore * numAfter;
                }
                else if(splitTotalHistory[i] === "/"){
                    resultingNum = numBefore / numAfter;
                }
    
                splitTotalHistory.splice(i-1,3,resultingNum);
                break;
            }
    
          }
       }
       while (splitTotalHistory.indexOf("+") != -1 || splitTotalHistory.indexOf("-") != -1){
           for (let i = 0; i<splitTotalHistory.length; i++){
               if(splitTotalHistory[i]=== "+"|| splitTotalHistory[i]=== "-"){
                   numBefore = Number(splitTotalHistory[i-1]);
                   numAfter = Number(splitTotalHistory[i+1]);
                   if(splitTotalHistory[i]=== "+"){
                       resultingNum = numBefore + numAfter;
                    }
                    else{
                        console.log(resultingNum);
                        resultingNum = numBefore - numAfter;
                        splitTotalHistory.splice(i-1,3,resultingNum);
                        break;
                }
            }
        }
    }
    return splitTotalHistory;
}
let totalHistory = "";
let CurrentValue = "";
const screen = document.getElementById('currentOperationScreen');
// displayCurrentValue()

const previous = document.getElementById('lastOperationScreen');
// displayTotalHistory();


function displayTotalHistory(){
    previous.textContent = totalHistory;
}

function displayCurrentValue() {
    if (CurrentValue === "") screen.textContent = 0
    else screen.textContent = CurrentValue
}


let mathKeys = document.querySelectorAll(".mathKey");
let historyValue = document.querySelector(".history");
let prevOperation = " ";
mathKeys = Array.from(mathKeys);
mathKeys.forEach(function(key){
    key.addEventListener("click",(e)=>{
        if(e.target.id === "="){
            const result = calculate();
            console.log(result);
            screen.textContent = result[0];
            currentNumber = result[0];
            totalHistory = result[0].toString();
            return result;
        }
        else{
            if(CurrentValue){
                clear();
                const operation = e.target.id;
                if (totalHistory !== historyValue.textContent){
                    totalHistory += ' ' + operation + ' ';
                }
                else{
                    let newHistory = '';
                    if (totalHistory.charAt(totalHistory.length-2)=== prevOperation){
                        for(let i =0;i<totalHistory.length - 2;i++){
                            newHistory+= totalHistory[i];
                        }
                        totalHistory = newHistory;
                        totalHistory += operation + " ";
                    }
                }
                historyValue.textContent = totalHistory;
                prevOperation = operation;
            }
        }
    })
})


function display(e) {
    const eNum = e.target.textContent;
    if (CurrentValue === "0") CurrentValue = eNum;
    if (totalHistory === "0") CurrentValue = eNum;

    else CurrentValue = CurrentValue + eNum;
     totalHistory= totalHistory+ eNum;


    
    displayCurrentValue();
    displayTotalHistory();
}
const operatorPress = (e) => {
    const eNum = e.target.textContent;
    CurrentValue = CurrentValue + " " + eNum + " ";
    totalHistory= totalHistory + " " + eNum + " ";
    displayCurrentValue();
    displayTotalHistory();
}

const calc = () => {
    const result = calculate();
    screen.textContent = result[0];
    console.log(result);
    console.log(result[0]);
    currentNumber = result[0];
    totalHistory = result[0].toString();
    return result;
    
}


// const add = (a, b) => {
//     return a + b;
// }


// const subtract = (a,b) => {
//     return a - b;
// }

// const multiply = (a,b) =>{
//     return a * b;
// }

// const divide = (a,b) =>{
//     return a / b;
// }



const kok = document.querySelectorAll('[data-number]');
kok.forEach((butt) => butt.addEventListener('click', display))

const op = document.querySelectorAll('[data-operator]');
op.forEach((ass) => ass.addEventListener('click',operatorPress));



const peri = document.getElementById('pointBtn');
peri.addEventListener('click', display);



const clearBtn = document.getElementById('clearBtn');
const clear = () => {
    clearBtn.addEventListener('click', e=> {
        if(e.target.id === "clearBtn"){
            screen.textContent = "0";
            previous.textContent ="0";

        }
    })
}

clearBtn.addEventListener('click', clear);


// const clearHistory = () => {
//     totalHistory = '';
//     displaytotalHistory();
// }

const remove = document.getElementById('deleteBtn');



let del = () => {
    CurrentValue = CurrentValue.substring(0, CurrentValue.length-1);
    displayCurrentValue();
}



remove.addEventListener('click', del)




const equalis = document.getElementById('=');

equalis.addEventListener('click', calc);


