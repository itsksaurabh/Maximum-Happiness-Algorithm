const XLSX = require('xlsx'),
      fs   = require('fs');


//seeding data 
fs.truncate('sharedTales.txt', 0, () => { });
const url = 'file.xlsx';

let workbook = XLSX.readFile(url);                //reading excel sheet
let sheetFirstName = workbook.SheetNames[0];
let workSheet = workbook.Sheets[sheetFirstName];
let userObjectArray = XLSX.utils.sheet_to_json(workSheet);

//remove reapeating elements from the array
const filterArray  = (arr)=>{
    var uniq = new Set(arr.map(e => JSON.stringify(e)));
    var filteredArray = Array.from(uniq).map(e => JSON.parse(e));
    return filteredArray;
}

let uniqueArray = filterArray(userObjectArray);

//Count the total number tales
let getTotalTales = (arrayList,flag)=>{
    if(flag=== 0){
        return arrayList.length;
    } else if(flag === 1){
        let totalTales = 0;
        arrayList.forEach((array)=>{
            totalTales += array.myTales.length;
        })
        return totalTales;
    }
}

let totalTales = getTotalTales(uniqueArray,0);

//counts the number of tales shared by individual writer and returns the winning probability
const WinningProbability = (array,writer_id) => {
    let count = 0;
    array.forEach((writer) => {
        if (writer.writer_id === writer_id) count++;
    })

return count / totalTales;   
}

//returns the array of tales shared by individual writers
const getMyTales = (writer_id) =>{
    let tales = [];
    uniqueArray.forEach((writer) => {
        if (writer.writer_id === writer_id) tales.push(writer.tale_id);
    })
    return tales;
}

//returns the maximum Winning Probability
const getMaxWinningProbability = (array) =>{
    let max = 0;
    array.forEach((user)=>{
        if (user.WinningProbability > max) max = user.WinningProbability;
    });
    return max;
}

//makes array empty
const emptyLists = (allArrayList) => {
    allArrayList.forEach((list) => {
        list.length = 0;
    })
}

//mapping the tales to each writer
let modifiedUserList = uniqueArray.map((user)=>{
                        return {
                            writer_id : user.writer_id,
                            myTales : getMyTales(user.writer_id),
                            WinningProbability: WinningProbability(uniqueArray,user.writer_id), 
                            shareFlag : true,
                            earning : 0
                        }
                    });
//final list of writers with their tales
let uniqueModifiedArray = filterArray(modifiedUserList);
fs.writeFileSync('userFile.json', JSON.stringify(uniqueModifiedArray));




//Group users by their winning probability
let maxWinningProbability = getMaxWinningProbability(uniqueModifiedArray); //maximum winning probability
let list1  = [],
    list2  = [],
    list3  = [],
    list4  = [],
    list5  = [],
    list6  = [],
    list7  = [],
    list8  = [],
    list9  = [],
    list10 = [];

const fillList = (userArray) => {
    userArray.forEach((user)=>{
       let wp = user.WinningProbability;
       let numOfTales = user.myTales.length;
       let status = user.shareFlag;
        if (maxWinningProbability * 0.9 < wp && wp <= maxWinningProbability && numOfTales != 0 && status === true){
           list1.push(user.writer_id);
        } else if (maxWinningProbability * 0.8 <= wp && wp < maxWinningProbability * 0.9 && numOfTales != 0 && status === true) {
           list2.push(user.writer_id);
        } else if (maxWinningProbability * 0.7 <= wp && wp < maxWinningProbability * 0.8 && numOfTales != 0 && status === true) {
           list3.push(user.writer_id);
        } else if (maxWinningProbability * 0.6 <= wp && wp < maxWinningProbability * 0.7 && numOfTales != 0 && status === true) {
           list4.push(user.writer_id);
        } else if (maxWinningProbability * 0.5 <= wp && wp < maxWinningProbability * 0.6 && numOfTales != 0 && status === true) {
           list5.push(user.writer_id);
        } else if (maxWinningProbability * 0.4 <= wp && wp < maxWinningProbability * 0.5 && numOfTales != 0 && status === true) {
           list6.push(user.writer_id);
        } else if (maxWinningProbability * 0.3 <= wp && wp < maxWinningProbability * 0.4 && numOfTales != 0 && status === true) {
           list7.push(user.writer_id);
        } else if (maxWinningProbability * 0.2 <= wp && wp < maxWinningProbability * 0.3 && numOfTales != 0 && status === true) {
           list8.push(user.writer_id);
        } else if (maxWinningProbability * 0.1 <= wp && wp < maxWinningProbability * 0.2 && numOfTales != 0 && status === true) {
           list9.push(user.writer_id);
        } else if (maxWinningProbability * 0 < wp && wp < maxWinningProbability * 0.1 && numOfTales != 0 && status === true){
           list10.push(user.writer_id);
        }
    })
}

 fillList(uniqueModifiedArray);  


let allArrayList = [list1,list2,list3,list4,list5,list6,list7,list8,list9,list10];

 //returns an array of non-empty lists
const arraySelector = (arrayList)=>{
    let selectedArrayList = [];
    arrayList.forEach((array)=>{
        if(array.length!=0){
            selectedArrayList.push(array);
        }
    })
return selectedArrayList;
}

let selectedArrayList = arraySelector(allArrayList);

 
//returns random element from an array
const randomizer = (array) => {

            let randomIndex = Math.floor((Math.random() * array.length));
            return array[randomIndex];
}

//update the user info if selected 

const update = (writer_id)=>{
    let len = uniqueModifiedArray.length;
    for(let i=0;i<len;i++){
        if (uniqueModifiedArray[i].writer_id === writer_id){
            if (uniqueModifiedArray[i].shareFlag === true && uniqueModifiedArray[i].myTales.length != 0) {
                   
                    uniqueModifiedArray[i].earning += 1000;
                    fs.appendFileSync('sharedTales.txt', uniqueModifiedArray[i].myTales.pop() + '\r\n');
                    uniqueModifiedArray[i].WinningProbability = WinningProbability(uniqueModifiedArray, writer_id);
                    totalTales = getTotalTales(uniqueModifiedArray, 1);
                    maxWinningProbability = getMaxWinningProbability(uniqueModifiedArray);
                    fillList(uniqueModifiedArray);
                   

            }

            if (uniqueModifiedArray[i].myTales.length === 0){
                uniqueModifiedArray[i].shareFlag = false;
                uniqueModifiedArray[i].WinningProbability = 0;
            }
        }
    }

    selectedArrayList = arraySelector(allArrayList);
    emptyLists(allArrayList);
    fillList(uniqueModifiedArray);
    fs.writeFileSync('userFile.json', JSON.stringify(uniqueModifiedArray));
 
}

//returns 10 Lucky writers of the day
const getLuckyTen = (arrayList) =>{
    let luckyTen =[];
    while (totalTales>=10) {
        
    arrayList.forEach((user)=>{
        if(user != undefined && user.length!=0){
            let lucky = randomizer(user);
            if (!luckyTen.includes(lucky)){
                luckyTen.push(lucky);
                update(lucky);
            }
        }
       
    });

    let length = luckyTen.length;
    if(length!= 10){
       while(length<10){
           let randomIndex = Math.floor((Math.random() * selectedArrayList.length));
           if (selectedArrayList[randomIndex] != undefined && selectedArrayList[randomIndex].length != 0){
               let lucky = randomizer(selectedArrayList[randomIndex]);
               luckyTen.push(lucky);
               update(lucky);
               
           }
           length = luckyTen.length;
       }
    }

    return luckyTen;
    totalTales = getTotalTales(uniqueModifiedArray, 1)
}
}

//starter function
/*** 
 sharedTales.txt carries daily shared tale_ids.
 userFile.json carries information about each writer

 ***/
const start = ()=>{
              const fn =  setInterval(() => {
            let luckyTen = getLuckyTen(selectedArrayList);
            if(luckyTen!= undefined){
                console.log('Ten Lucky writers of the day!');
                console.log('=============================');
                console.log(luckyTen);
                console.log('=============================');
            }else{
                console.log("======== Thank You =========");
                console.log("SharedTales.txt carries daily shared tale_ids.\nuserFile.json carries information about each writer");
                console.log('=============================');
                clearInterval(fn);
            }
                

            }, 1000)
}

start();
