# Maximum Happiness Algorithmic 

Please refer to data given in this sheet: ``` file.xlsx ```
<br>
The data is tales submitted by writers, in a given month. Column 1 is writer_id (ID of a writer). Column 2 is
tale_id, each submission by a writer is an unique tale_id. A writer may have submitted more than 1 tale in the
given month.

Givens:

1. XYZ publishes 10 stories a day.
2. A writer gets Rs 1000 every time his/her story is published (more published => more money => higher happier
index)
3. A writer becomes increasingly unhappy if his/her story isn't getting published for many days (less income =>
unhappy)

Expected solution:

1. Design an algorithm to build a publishing schedule (adhering to 10 per day limit), such that the schedule
maximises overall writer happiness while minimising individual writer unhappiness.
2. Consider factors like different writers would have submitted different number of tales (refer to data sheet)
3. Consider factors like writers who make too little money or nothing in a month may be most unhappy and leave
XYZ. Algorithm must strive to minimise writers leaving XYZ.

# Solution

In the given problem let,

```
The total number of tales be T,
```
```
Writers be Y 1 ,Y 2 ,Y3.......... Yn
```
```
Suppose number of tales by writer Y 1 = k
```
Then the winning probability of writer Y 1 ,i.e. the probability of writer’s tales to be published
```
Winning probability = K / T.
```
The problem is that as the number of T increases then the Winning probability of writer Y 1 decreases. Hence, the
writer becomes increasingly unhappy if his/her story isn't getting published for many days.

As a solution to cope up with this problem,we have to design an algorithm to build a publishing schedule
(adhering to 10 per day limit), such that the schedule maximises overall writer happiness while minimising
individual writer unhappiness.

## Step 1 :
 Map each writer by introducing new properties such that each Writer object look like this :

```
 {

writer_id : user.writer_id,

myTales : getMyTales(user.writer_id),

WinningProbability: WinningProbability(uniqueArray,user.writer_id),

shareFlag : true,

earning : 0

}
```
Here ,

myTales = array of tale_id (s) shared by individual user

share flag is true when myTales is not equals to 0,otherwise it becomes false

## Step 2 :

Group writers by their winning probability.

Since, we have to return 10 tales each day , make 10 different Lists ,say List1,List2......List10.

Now, take the maximum of the winning probability and push each writer_id to their respective group by their
winning probabilities w.r.t. maximum winning probability.
```
//Group users by their winning probability

let maxWinningProbability = getMaxWinningProbability(uniqueModifiedArray); //maximum

winning probability

let list1 = [],

list2 = [],

list3 = [],

list4 = [],

list5 = [],

list6 = [],

list7 = [],

list8 = [],

list9 = [],

list10 = [];

const fillList = (userArray) => {

userArray.forEach((user)=>{

let wp = user.WinningProbability;

let numOfTales = user.myTales.length;

let status = user.shareFlag;

if (maxWinningProbability * 0.9 < wp && wp <= maxWinningProbability && numOfTales

!= 0 && status === true){

list1.push(user.writer_id);

} else if (maxWinningProbability * 0.8 <= wp && wp < maxWinningProbability * 0.

&& numOfTales != 0 && status === true) {

list2.push(user.writer_id);

} else if (maxWinningProbability * 0.7 <= wp && wp < maxWinningProbability * 0.

&& numOfTales != 0 && status === true) {

list3.push(user.writer_id);

} else if (maxWinningProbability * 0.6 <= wp && wp < maxWinningProbability * 0.

&& numOfTales != 0 && status === true) {

list4.push(user.writer_id);


} else if (maxWinningProbability * 0.5 <= wp && wp < maxWinningProbability * 0.

&& numOfTales != 0 && status === true) {

list5.push(user.writer_id);

} else if (maxWinningProbability * 0.4 <= wp && wp < maxWinningProbability * 0.

&& numOfTales != 0 && status === true) {

list6.push(user.writer_id);

} else if (maxWinningProbability * 0.3 <= wp && wp < maxWinningProbability * 0.

&& numOfTales != 0 && status === true) {

list7.push(user.writer_id);

} else if (maxWinningProbability * 0.2 <= wp && wp < maxWinningProbability * 0.

&& numOfTales != 0 && status === true) {

list8.push(user.writer_id);

} else if (maxWinningProbability * 0.1 <= wp && wp < maxWinningProbability * 0.

&& numOfTales != 0 && status === true) {

list9.push(user.writer_id);

} else if (maxWinningProbability * 0 < wp && wp < maxWinningProbability * 0.1 &&

numOfTales != 0 && status === true){

list10.push(user.writer_id);

}

})

}

fillList(uniqueModifiedArray);
```

## Step 3 :

Remove the Lists which is empty so that only the lists having one or more than one writer_id will be taken into
consideration.
```
let allArrayList = [list1,list2,list3,list4,list5,list6,list7,list8,list9,list10];

//returns an array of non-empty lists

const arraySelector = (arrayList)=>{

let selectedArrayList = [];

arrayList.forEach((array)=>{

if(array.length!= 0 ){

selectedArrayList.push(array);

}

})

return selectedArrayList;

}

let selectedArrayList = arraySelector(allArrayList);
```
## Step 4 :

Pick a writer_id from each non-empty Lists one by one. By doing this the chances of each Writers to get selected
becomes very high since T >>> Length of each group List.
```
//returns 10 Lucky writers of the day

const getLuckyTen = (arrayList) =>{

let luckyTen =[];


while (totalTales>= 10 ) {

arrayList.forEach((user)=>{

if(user != undefined && user.length!= 0 ){

let lucky = randomizer(user);

if (!luckyTen.includes(lucky)){

luckyTen.push(lucky);

update(lucky);

}

}

 });

let length = luckyTen.length;

if(length!= 10 ){

while(length< 10 ){

let randomIndex = Math.floor((Math.random() * selectedArrayList.length));

if (selectedArrayList[randomIndex] != undefined &&

selectedArrayList[randomIndex].length != 0 ){

let lucky = randomizer(selectedArrayList[randomIndex]);

luckyTen.push(lucky);

update(lucky);

 }

length = luckyTen.length;

}

}

return luckyTen;

totalTales = getTotalTales(uniqueModifiedArray, 1 )

}

}
```
## Step 5 : 
If the writer is in the list of Ten Lucky writers,Then do the following :


- Publish their one Tale and remove it from their myTales list.
- Add 1000 to their earnings
- Update T , total number of all tales by all writer
- Update their winning probability
- Get the new maximum winning probability

Perform Step 5 for each element in the list of Ten Luck writers.
```
//returns random element from an array

const randomizer = (array) => {

let randomIndex = Math.floor((Math.random() * array.length));


return array[randomIndex];

}

//update the user info if selected

const update = (writer_id)=>{

let len = uniqueModifiedArray.length;

for(let i= 0 ;i<len;i++){

if (uniqueModifiedArray[i].writer_id === writer_id){

if (uniqueModifiedArray[i].shareFlag === true &&

uniqueModifiedArray[i].myTales.length != 0 ) {

uniqueModifiedArray[i].earning += 1000 ;

fs.appendFileSync('sharedTales.txt',

uniqueModifiedArray[i].myTales.pop() + '\r\n');

uniqueModifiedArray[i].WinningProbability =

WinningProbability(uniqueModifiedArray, writer_id);

totalTales = getTotalTales(uniqueModifiedArray, 1 );

maxWinningProbability = getMaxWinningProbability(uniqueModifiedArray);

fillList(uniqueModifiedArray);

}

if (uniqueModifiedArray[i].myTales.length === 0 ){

uniqueModifiedArray[i].shareFlag = false;

uniqueModifiedArray[i].WinningProbability = 0 ;

}

}

}

selectedArrayList = arraySelector(allArrayList);

emptyLists(allArrayList);

fillList(uniqueModifiedArray);

fs.writeFileSync('userFile.json', JSON.stringify(uniqueModifiedArray));

}
```
# About Starter function

 The starter function “start()” repeats itself in every 1 sec and prints the list of 10 Lucky writers of the day. 
Let 1 second = 1 Day.
```
//starter function

const start = ()=>{

const fn = setInterval(() => {

let luckyTen = getLuckyTen(selectedArrayList);

if(luckyTen!= undefined){

console.log('Ten Lucky writers of the day!');

console.log('=============================');

console.log(luckyTen);

console.log('=============================');

}else{

console.log("======== Thank You =========");


clearInterval(fn);

}

 }, 1000 )

}

start();
```
# Conclusion

Hence, The chances of getting selected becomes very high as instead of selecting the Tale randomly from the list of

list of all tales we group the users by their winning probabilities and select a random user from each group.By

doing so , the algorithm maximises overall writer happiness while minimising individual writer unhappiness.

# Requirements
- Node.js
- xlsx

# Usage and Installation
run the following command before running the app
```
$npm install
```
Start the app 
```
$node app.js
```
# Author
<ul>
 <li><a href="https://in.linkedin.com/in/itsksaurabh"><strong>Kumar Saurabh</strong></a></li>
</ul>
