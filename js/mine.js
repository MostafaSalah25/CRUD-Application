var productName = document.getElementById( "pName" );
var productPrice = document.getElementById( "pPrice" );
var productCategory = document.getElementById( "pCat" );
var productDescription = document.getElementById( "pDesc" );  
var productCount = document.getElementById("pCount");


var addButton =  document.getElementById("mainButton");


var productsContainer =[];//array of objects 'product'to keep every product user add  not new product replace old p

// as idea of cartona 
// if write it after var after fun ..it work! > as all code load before click button so it know var



if( localStorage.getItem("myproducts")  !=null  ) // not equal empty .. there is data in local
{
    productsContainer = JSON.parse ( localStorage.getItem("myproducts") );  
    displayProducts(productsContainer); // there is data ..so display it 
}
else 
{
    var productsContainer =[] ;   // else start empty array ,  so can not define var array
}                                  // w kda kda can access var if need as hoisting of var except if var in fun 

function addProduct () {

    var product = {          

        name: productName.value , 
        count : productCount.value,
        price: productPrice.value , 
        category: productCategory.value , 
        desc: productDescription.value  
    }
    productsContainer.push(product) ; // push object in array 

    localStorage.setItem("myproducts"  , JSON.stringify(productsContainer) ) ; // do refresh array will empty of old products 
    displayProducts(productsContainer);  // add product ..localS > storage array of just new product  
    clearform();


}

// display 'make tr for objects.products. in array'> if 10 object in array > make 10 tr for them relate to nu of items of array 

function displayProducts(productList){   // call it in add pro fun to ..as after every add pro do new display to objects which
          // push'store' in array ...  not good to do display  all object in array in every time!
    var cartona = "";
    for( var i=0 ; i<productList.length  ; i++   ) {

        cartona += ` <tr>

        <td>${i+1}</td>
        <td>`+productList[i].name+`</td>
        <td>`+productList[i].count+`</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].desc}</td>
        
        <td> <button onclick="increaseCount(${i} )"  class="btn btn-info" > <i class=" fas fa-plus-circle " ></i> </button> </td>
        <td> <button onclick="decreaseCount(${i} )"   class="btn btn-info" > <i class=" fas fa-minus-circle " ></i> </button> </td>

        <td> <button onclick="retreiveInInputs(${i} )" class="btn btn-outline-warning" >update</button> </td>

        <td> <button onclick="deleteProduct(${i} )" class="btn btn-outline-danger " >delete</button> </td>
    </tr>` ;
    }
    document.getElementById('tbody').innerHTML = cartona ;
}

// productsContainer[i].name > productsContainer[i] = item of array which= object then . to get prop of obj 
// use ${i} to make var > here i=var=productsContainer[i].price if string with backticks not quotes

// make input value = 0 after add 
function clearform () {      // no problem if write it before or after display fun as objects be stored in array 

    productName.value="";
    productCount.value="";
    productPrice.value="";
    productCategory.value="";
    productDescription.value="";
}


// array storaged in ram > when refresh > empty ram from vars & code run > make array=[] > 0 > solve> database 
// or if prog small > can use localstorage of browser 

//  delete 

// put parameter in fun in button in for loop  mean send 7aga to fun which receive it 'index' so use it in fun 
function deleteProduct (index)
{
    productsContainer.splice(  index , 1); // just delete from array so > 

    displayProducts(productsContainer);  // to display array after delete 

    localStorage.setItem( "myproducts"  , JSON.stringify(productsContainer) );
    
}

// search  

function searchProducts (term) {

    var searchProducts = [];
    for( var i= 0 ; i<productsContainer.length ;  i++  ){ 

        if( productsContainer[i].name.toLowerCase().includes( term.toLowerCase() )  ==true  )
        {

            searchProducts.push(productsContainer[i]); // new productsContainer > op of if condition 
        }

    }

    displayProducts(searchProducts);
}


// update 
function retreiveInInputs (index)  {

    productName.value = productsContainer[index].name;
    productPrice.value = productsContainer[index].price;
    productCategory.value = productsContainer[index].category;
    productDescription.value = productsContainer[index].desc;

    addButton.innerHTML=`<button  onclick="updateProduct(${index})" class="btn btn-danger text-white">update Product</button>`

}

function updateProduct(index) 
{
    productsContainer[index].name=productName.value;
    productsContainer[index].price=productPrice.value;
    productsContainer[index].category=productCategory.value;
    productsContainer[index].desc=productDescription.value;


    clearform();
    displayProducts(productsContainer);
    localStorage.setItem("myproducts"  , JSON.stringify(productsContainer) ) ;
    addButton.innerHTML=`<button  onclick="addProduct()" class="btn btn-info text-white">Add Product</button>`

}


// increase 

function increaseCount (index){

    productsContainer[index].count++;
    displayProducts(productsContainer);
    localStorage.setItem("myproducts"  , JSON.stringify(productsContainer) ) ;

}
// decrease 
function decreaseCount (index){

    if(productsContainer[index].count == 0){
        productsContainer[index].count = 0
    }
    else{
        
        productsContainer[index].count--;
        displayProducts(productsContainer);
        localStorage.setItem("myproducts"  , JSON.stringify(productsContainer) ) ;
    }

   
}

