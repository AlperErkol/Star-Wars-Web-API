/*


1)This file gets ALL datas from base url.
2)Response are saved to localStorage.
3)When executed, requests starts.
4)When requests ended, you can see data whatever you want from using dropdown.


The program controls your localStorage to find Star Wars Web API query. If it could not find, 
it sends requests to base url to store the data on localStorage. If it could find,
it uses localStorage data... 


*/
const baseURL = 'https://swapi.dev/api/';
const getData = document.getElementById('getData');
const selectBox = document.getElementById('datas');
const tableBody = document.getElementById('tableBody');
const tableHead = document.getElementById('tableHead');
const addCell = document.getElementById('addCell');
const countDisplay = document.getElementById('countOfData');
const warn = document.getElementById('warn');
var dataAttributes = ""; // object's properties
var lenOfData = 0;
var categories = [];
var dict = {};
var counter = 0;
var controlDataTypes = ['people','films','starships','vehicles','species','planets'].sort();
var lStorage = Object.keys(localStorage).sort();





if(isEqual(controlDataTypes,lStorage))
{

    Object.keys(localStorage).forEach(element => {
        dict[element] = JSON.parse(localStorage.getItem(element));
    });

}else{

    main();
    setTimeout(_=>{
        addLocalStorage(dict);
    },4000);

}


function isEqual(arr1,arr2){

    if (arr1 === arr2) return true;
    if (arr1 == null || arr2 == null) return false;
    if (arr1.length !== arr2.length) return false;

    for (var i = 0; i < arr1.length; ++i) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;

}



async function main(){

    const response = await fetch(baseURL);
    const data = await response.json();
    parseData(data);

}


//Event Listeners start
getData.addEventListener('click',e=>{

    e.preventDefault();
    clearTable();

    if(selectBox.value === '-1') {
        lenOfData = 0;
        countDisplay.innerHTML = "";
        addCell.disabled = true;
        addCell.classList.add('inactive');
        addCell.classList.remove('active');
        alert('You have to choose corrent input!');
        return false;
    }
    if(selectBox.value === 'People')
    {
        
        lenOfData = 0;
        dataAttributes = ['name','gender','hair_color','height','mass','skin_color','options'];
        const resp = JSON.parse(localStorage.getItem('people'));
        if(isEmpty(resp) == false) displayTable(resp);
        else{
            warn.classList.add('on');
            warn.classList.remove('off');
        }

    } 
    if(selectBox.value === 'Films'){
        warn.classList.add('off');
        warn.classList.remove('on');
        lenOfData = 0;
        dataAttributes = ['title','producer','release_date','episode_id','director','opening_crawl','options'];
        const resp = JSON.parse(localStorage.getItem('films'));
        if(isEmpty(resp) == false) displayTable(resp);
        else{
            warn.classList.add('on');
            warn.classList.remove('off');
            displayTable(resp);
        }
    }
    if(selectBox.value === 'Starships'){
        warn.classList.add('off');
        warn.classList.remove('on');
        lenOfData = 0;
        dataAttributes = ['name','cargo_capacity','consumables','cost_in_credits','crew','length','options'];
        const resp = JSON.parse(localStorage.getItem('starships'));
        if(isEmpty(resp) == false) displayTable(resp);
        else{
            warn.classList.add('on');
            warn.classList.remove('off');
            displayTable(resp);
        }
    }
    if(selectBox.value === 'Vehicles'){
        warn.classList.add('off');
        warn.classList.remove('on');
        lenOfData = 0;
        dataAttributes = ['name','cargo_capacity','consumables','cost_in_credits','crew','length','manufacturer','options'];
        const resp = JSON.parse(localStorage.getItem('vehicles'));
        if(isEmpty(resp) == false) displayTable(resp);
        else{
            warn.classList.add('on');
            warn.classList.remove('off');
            displayTable(resp);
        }
    }
    if(selectBox.value === 'Species'){
        warn.classList.add('off');
        warn.classList.remove('on');
        lenOfData = 0;
        dataAttributes = ['name','average_height','average_lifespan','classification','designation','eye_colors','language','options'];
        const resp = JSON.parse(localStorage.getItem('species'));
        if(isEmpty(resp) == false) displayTable(resp);
        else{
            warn.classList.add('on');
            warn.classList.remove('off');
            displayTable(resp);
        }
    }
    if(selectBox.value === 'Planets'){
        warn.classList.add('off');
        warn.classList.remove('on');
        lenOfData = 0;
        dataAttributes = ['name','climate','gravity','terrain','population','diameter','options'];
        const resp = JSON.parse(localStorage.getItem('planets'));
        if(isEmpty(resp) == false) displayTable(resp);
        else{
            warn.classList.add('on');
            warn.classList.remove('off');
            displayTable(resp);
        }
    }
    
});

selectBox.addEventListener('click',e=>{

    e.preventDefault();
    if(selectBox.value === '-1') getData.innerHTML = "GET DATA";
    if(selectBox.value === 'People') getData.innerHTML = "GET PEOPLE";
    if(selectBox.value === 'Films') getData.innerHTML = "GET FILMS";
    if(selectBox.value === 'Starships') getData.innerHTML = "GET STARSHIPS";
    if(selectBox.value === 'Vehicles') getData.innerHTML = "GET VEHICLES";
    if(selectBox.value === 'Species') getData.innerHTML = "GET SPECIES";
    if(selectBox.value === 'Planets') getData.innerHTML = "GET PLANETS";
    

});

addCell.addEventListener('click',e=>{

    addCell.disabled = true;
    addCell.classList.add('inactive');
    var dictElem = dict[(selectBox.value).toLowerCase()];
    var remainingData=0;
    lenOfData = 0;

    dictElem.forEach(element => {
        element.forEach(element2 =>{
            lenOfData++;
        });    
    });
    
    
    
    dictElem.forEach(element => {
        element.forEach(element2 =>{
            if(Object.keys(element2).length != 0) remainingData++;
        });    
    });

    
    const trBody = document.createElement('tr');
    tableBody.appendChild(trBody);
    for(var i = 0;i<dataAttributes.length;i++)
    {
        const td = document.createElement('td');
        td.classList.add(`td${lenOfData}`);
        trBody.appendChild(td);

        if(i === dataAttributes.length-1)
        {
            
            const btn = document.createElement('button');
            btn.classList.add(`row${lenOfData}`);
            btn.innerHTML = "Create";
            td.appendChild(btn);
            trBody.appendChild(td);

            

            btn.addEventListener('click', e=>{
                

                const cName = btn.className;
                var counter = document.getElementsByClassName(cName).length;
                
                if(btn.innerHTML === "Create"){
                    
                    var data = [];
                    for(var k = 0;k<counter-1;k++)
                    {
                        document.getElementsByClassName(cName)[k].disabled = true;
                        data.push(document.getElementsByClassName(cName)[k].value);
                        
                    }
                    
                    var counterFlag = 0;
                    data.forEach(element => {
                        if(element == ""){
                            counterFlag++;
                        }
                    });

                    if(counterFlag == counter-1){
                        alert("All inputs can not empty!");
                        trBody.remove();
                        remainingData--;
                        countDisplay.innerHTML = "Count of Data : "+remainingData;
                        addCell.disabled = false;
                        addCell.classList.add('active');
                        addCell.classList.remove('inactive');
                    }else{
                        
                        addRow(data);
                        warn.classList.add('off');
                        warn.classList.remove('on');
                        addCell.disabled = false;
                        addCell.classList.add('active');
                        addCell.classList.remove('inactive');
                        
                    }

                    btn.innerHTML = "Update";

                }
                

                else if(btn.innerHTML === "Update"){
                    

                    for(var k = 0;k<counter-1;k++)
                    {
                        document.getElementsByClassName(cName)[k].disabled = false;
                    }
                    btn.innerHTML = "Save";


                }

                else if(btn.innerHTML === "Save"){
                    
                    var data = [];
                    for(var k = 0;k<counter-1;k++)
                    {
                        document.getElementsByClassName(cName)[k].disabled = true;
                        data.push(document.getElementsByClassName(cName)[k].value);
                        
                    }
                    var counterFlag = 0;
                    data.forEach(element => {
                        if(element == ""){
                            counterFlag++;
                        }
                    });

                    if(counterFlag == counter-1){
                        alert("All inputs can not empty!");
                        trBody.remove();
                        remainingData--;
                        countDisplay.innerHTML = "Count of Data : "+remainingData;
                        
                    }else{
                        
                        updateRow(cName,data);
                        
                    }
                    btn.innerHTML = "Update";
                }

            });

        }else{
            
            var inp = document.createElement('input');
            inp.classList.add(`row${lenOfData}`);
            td.appendChild(inp);
            trBody.appendChild(td);


            //Delete
            td.addEventListener('contextmenu',e=>{
                e.preventDefault();
                var tdName = td.className;
                deleteRow(tdName);
                trBody.remove();
                remainingData--;
                countDisplay.innerHTML = "Count of Data : "+remainingData;
                if(remainingData == 0){

                    
                    warn.classList.add('on');
                    warn.classList.remove('off');


                } 
                
            });
        }


    }
    remainingData++; // Increase by one
    countDisplay.innerHTML = "Count of Data : "+remainingData;
    
});
//Event Listeners End


//Functions start
function displayTable(data)
{

    var lenOfArray = data.length;
    
    data.forEach(element => {
        element.forEach(element2 =>{
            if(Object.keys(element2).length != 0) lenOfData++;
        });    
    });

    countDisplay.innerHTML = "Count of Data : "+ lenOfData;

    var trHead = document.createElement('tr');
    tableHead.appendChild(trHead);
    dataAttributes.forEach(element => {

        var th = document.createElement('th');
        trHead.appendChild(th);
        th.innerHTML = element.charAt(0).toUpperCase()+element.slice(1);
            
    });

    var temp1 = 0;
    
    for(var i = 0;i<lenOfArray;i++)
    {
        for(var m = 0;m<data[i].length;m++)
        {
            
            if(Object.keys(data[i][m]).length != 0)
            {
                const trBody = document.createElement('tr');
                tableBody.appendChild(trBody);

                for(var j =0;j<dataAttributes.length;j++)
                {

                    const td = document.createElement('td');
                    td.classList.add(`td${temp1}`);
                    trBody.appendChild(td);

                    
                    

                    // Delete
                    td.addEventListener('contextmenu',e=>{
                        e.preventDefault();
                        var tdName = td.className;
                        deleteRow(tdName);
                        trBody.remove();
                        lenOfData--;
                        countDisplay.innerHTML = "Count of Data : "+lenOfData;
                        if(lenOfData == 0) {
                        
                            warn.classList.add('on');
                            warn.classList.remove('off');
                        }
                        
                    });

                    if(j === dataAttributes.length-1){

                        
                        const btn = document.createElement('button');
                        btn.classList.add(`row${temp1}`);

                        btn.innerHTML = "Update";
                        td.appendChild(btn);
                        
                        // Update
                        btn.addEventListener('click',e=>{
                            e.preventDefault();
                            var cName = btn.className;
                            
                            var counter = document.getElementsByClassName(cName).length;
                            if(btn.innerHTML === "Update"){

                                for(var k = 0;k<counter-1;k++)
                                {
                                    document.getElementsByClassName(cName)[k].disabled = false;
                                }
                                btn.innerHTML = "Save";
                            }
                            else{
                                for(var k = 0;k<counter-1;k++)
                                {
                                    document.getElementsByClassName(cName)[k].disabled = true;
                                }

                                var obj = [];
                                for(var q = 0;q<dataAttributes.length;q++){
                                    obj.push(document.getElementsByClassName(cName)[q].value);
                                }
                                updateRow(cName,obj);
                                btn.innerHTML = "Update";
                            }
                            
                        });
                    
                    }else{
                        

                        var inp = document.createElement('input');
                        inp.classList.add(`row${temp1}`);
                        
                        inp.disabled = true;
                        inp.value = data[i][m][dataAttributes[j]];
                    
                        td.appendChild(inp);

                        inp.addEventListener('click',e=>{
                            e.preventDefault();
                            
                        });
                    }

                    
                    
                }
            
            }
            temp1++;
            



        }   
    }

    //Make active when table was created!
    addCell.classList.add('active');
    addCell.disabled = false;
    addCell.classList.remove('inactive');

}

function updateRow(cName,obj){
    
    var category = (selectBox.value).toLowerCase();
    cName = parseInt(cName.replace("row",""));
    var getCategory = dict[category];
    var temp = 0;
    var data;
    var position = [];
    for(var i = 0;i<getCategory.length;i++)
    {
        for (var k = 0;k<getCategory[i].length;k++){
            
            if(temp == cName){   
                data = getCategory[i][k];
                position.push(i);
                position.push(k);
            } 
            temp++;
        }

    }
    

    

    
    for(var i =0;i<dataAttributes.length;i++)
    {
        data[dataAttributes[i]] = obj[i];
    }

    
    
    getCategory[position[0]][position[1]] = data;
    localStorage.setItem(category,JSON.stringify(getCategory));
    

}

function deleteRow(cName){


    var category = (selectBox.value).toLowerCase();
    cName = parseInt(cName.replace("td",""));
    var getCategory = dict[category];
    var temp = 0;
    var data;
    var position = [];
    for(var i = 0;i<getCategory.length;i++)
    {
        for (var k = 0;k<getCategory[i].length;k++){
            
            if(temp == cName){   
                data = getCategory[i][k];
                position.push(i);
                position.push(k);
            } 
            temp++;
        }

    }

    getCategory[position[0]][position[1]] = {};
    localStorage.setItem(category,JSON.stringify(getCategory));

    

}

function addRow(data){

    var category = (selectBox.value).toLowerCase();
    var getCategory = dict[category];
    var obj = {};
    for(var i = 0;i<data.length;i++)
    {
        obj[dataAttributes[i]] = data[i];
    }

    getCategory[getCategory.length-1].push(obj);
    localStorage.setItem(category,JSON.stringify(getCategory));
    
}

function isEmpty(arr){

    var arrCounter = 0;
    var control = 0;

    
    arr.forEach(element => {
        element.forEach(element2 => {
            if(Object.keys(element2).length == 0) arrCounter++;
            control++;
        });
    });
    
    if(arrCounter == control) return true;
    else return false;
}

function parseData(data){
    
    for(const elem in data){
        localStorage.setItem(elem,"");
        dict[elem] = [];
        categories.push(elem+'*'+data[elem]);
    }

    categories.forEach(element => {
        sendRequest(element);
    });
    
    
}

function addDictionary(data,name){
    
    if(data.next!=null)
    {   
        dict[name].push(data.results);
        sendSystem(data.next,name);
    }else{
        
        dict[name].push(data.results);
        
    }
}

function sendSystem(url,name){

    fetch(url)
    .then(responseQuery =>responseQuery.json())
    .then(data => addDictionary(data,name))
    .catch(err => console.log('An error occured : '+err));

}

function sendRequest(element){
    
    var url = element.split("*")[1];
    
    fetch(url)
    .then(responseQuery =>responseQuery.json())
    .then(data => addDictionary(data,element.split("*")[0]))
    .catch(err => console.log('An error occured : '+err));

}

function addLocalStorage(dict){

    for(const elem in dict){
        localStorage.setItem(elem,JSON.stringify(dict[elem]));
    }
}

function clearTable(){

    while(tableHead.firstChild){
        tableHead.removeChild(tableHead.lastChild);
    }
    
    while(tableBody.firstChild){
        tableBody.removeChild(tableBody.lastChild);
    }

}
//Functions end