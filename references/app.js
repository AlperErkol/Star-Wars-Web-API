/*


This file gets just first page of every data.
Response are not saved to localStorage.
When you choose the data type and click the button, request sends.



*/




const getData = document.getElementById('getData');
const tableBody = document.getElementById('tableBody');
const tableHead = document.getElementById('tableHead');
const addCell = document.getElementById('addCell');
const selectBox = document.getElementById('datas');
const countDisplay = document.getElementById('countOfData');
const baseURL = 'https://swapi.dev/api/';
var dataAttributes = ""; // object's properties
var query = "";
var lenOfData = 0;

// Events start

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

getData.addEventListener('click',e=>{

    e.preventDefault();
    clearTable();
    
    if(selectBox.value === '-1') {
        alert('You have to choose corrent input!');
        return false;
    }
    if(selectBox.value === 'People')
    {
        query = 'people/';
        dataAttributes = ['name','gender','hair_color','height','mass','skin_color','options'];   
    } 
    if(selectBox.value === 'Films'){
        query = 'films/';
        dataAttributes = ['title','producer','release_date','episode_id','director','opening_crawl','options'];
    }
    if(selectBox.value === 'Starships'){
        query = 'starships/';
        dataAttributes = ['MGLT','cargo_capacity','consumables','cost_in_credits','crew','length','options'];
    }
    if(selectBox.value === 'Vehicles'){
        query = 'vehicles/';
        dataAttributes = ['name','cargo_capacity','consumables','cost_in_credits','crew','length','manufacturer','options'];
    }
    if(selectBox.value === 'Species'){
        query = 'species/';
        dataAttributes = ['name','average_height','average_lifespan','classification','designation','eye_colors','language','options'];
    }
    if(selectBox.value === 'Planets'){
        query = 'planets/';
        dataAttributes = ['name','climate','gravity','terrain','population','diameter','options'];
    }

    fetch(baseURL+query)
    .then(response => response.json())
    .then(data => displayTable(data.results))
    .catch(err => console.log('An error occured : '+err));

    

});

addCell.addEventListener('click',e=>{

    const trBody = document.createElement('tr');
    tableBody.appendChild(trBody);
    for(var i = 0;i<dataAttributes.length;i++)
    {
        const td = document.createElement('td');

        if(i === dataAttributes.length-1)
        {
            
            const btn = document.createElement('button');
            btn.classList.add(`row${lenOfData}`);
            btn.innerHTML = "Save";
            td.appendChild(btn);
            trBody.appendChild(td);

            btn.addEventListener('click', e=>{

                const cName = btn.className;
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
                
                trBody.remove();
                lenOfData--;
                countDisplay.innerHTML = "Count of Data : "+lenOfData;
                if(lenOfData == 0) clearTable();
            });
        }


    }
    lenOfData++; // Increase by one
    countDisplay.innerHTML = "Count of Data : "+lenOfData;
    
});
//Events end



//Functions start
function displayTable(data)
{
    lenOfData = data.length;
    countDisplay.innerHTML = "Count of Data : "+lenOfData;


    var trHead = document.createElement('tr');
    tableHead.appendChild(trHead);
    dataAttributes.forEach(element => {

        var th = document.createElement('th');
        trHead.appendChild(th);
        th.innerHTML = element.charAt(0).toUpperCase()+element.slice(1);
            
    });

    for(var i = 0;i<data.length;i++)
    {   
            const trBody = document.createElement('tr');
            var th = document.createElement('th');
            tableBody.appendChild(trBody);

            for(var j =0;j<dataAttributes.length;j++)
            {

                const td = document.createElement('td');
                trBody.appendChild(td);

                // Delete
                td.addEventListener('contextmenu',e=>{
                    e.preventDefault();
                    
                    trBody.remove();
                    lenOfData--;
                    countDisplay.innerHTML = "Count of Data : "+lenOfData;
                    if(lenOfData == 0) clearTable();
                });

                if(j === dataAttributes.length-1){

                    
                    const btn = document.createElement('button');
                    btn.classList.add(`row${i}`);
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
                            btn.innerHTML = "Update";
                        }
                        
                    });
                
                }else{

                    var inp = document.createElement('input');
                    inp.classList.add(`row${i}`);
                
                    inp.disabled = true;
                    inp.value = data[i][dataAttributes[j]];
                    td.appendChild(inp);

                    inp.addEventListener('click',e=>{
                        e.preventDefault();
                        
                    });
                }
                
            }            
    }

    //Make active when table was created!
    addCell.classList.add('active');
    addCell.disabled = false;
    addCell.classList.remove('inactive');

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









