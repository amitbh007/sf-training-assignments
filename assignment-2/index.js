const cellClass = "px-5 py-5 border-b border-gray-200 bg-white text-sm"
const ItemClass = "text-gray-900 whitespace-no-wrap"
const titleClass = "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider" 
const buttonClass = "mx-1 bg-blue-700 py-1 px-3 my-2 rounded-full text-white hover:text-gray-500 text-sm"
const inputClass = "box-content w-16 px-1 bg-blue-200 py-1 rounded-md"
let users = [];

//initial data fetching and setting
$(document).ready(()=>{
    console.log("ready")

    $("#loadBtn").click(async ()=>{
        $("table").html("");
        console.log("clicked")
        //show loader when fetching
        $("#loader").css("display","block");
        try{
            const data = await fetch("data.json");
            const finalData = await data.json();
            $("#loader").css("display","none");
            $("#loadBtn").html("Reload Data")
            
            users = finalData;
            renderTable();

            //show the table
            $("table").css("display","block");
            console.log(finalData);
        }
        catch(err){
            $("#loader").css("display","none");
    
            console.log(err)
        }
        
    })

    

})

//button handlers
const handleEdit = (i)=>{
    //saving previous data
    $("table").find(`tr[id$="row${i}"]`).html(addRow({type:"input",e:users[i],i}));
}

const handleDelete = (i)=>{
    users.splice(i,1);
    renderTable();
}

const handleSave = (i)=>{

    //getting back form data
    const e = {
        firstName:$(`#i_fName${i}`).val(),
        middleName:$(`#i_mName${i}`).val(),
        lastName:$(`#i_lName${i}`).val(),
        email:$(`#i_email${i}`).val(),
        phone:$(`#i_phone${i}`).val(),
        address:$(`#i_address${i}`).val()
    }

    users[i] = e;
    renderTable();
    
}

const handleCancel = (i)=> $("table").find(`tr[id$="row${i}"]`).html(addRow({type:"data",e:users[i],i}))    

//render table
const renderTable = ()=>{
    $("table").html(addRow({type:"title"}));
    users.forEach((e,i)=>{
        $("table").append(`<tr id="row${i}">`+addRow({type:"data",e,i})+`</tr>`);
    })
}

//content adder
const addRow = ({type,e,i})=>{
    if(type=="data"&&e){
        return `
        <td id="fName${i}" class="${cellClass}">${e.firstName}</td>
        <td id="mName${i}" class="${cellClass}">${e.middleName}</td>
        <td id="lName${i}" class="${cellClass}">${e.lastName}</td>
        <td id="email${i}" class="${cellClass}">${e.email}</td>
        <td id="phone${i}" class="${cellClass}">${e.phone}</td>
        <td id="address${i}" class="${cellClass}">${e.address}</td>
        <td class="${cellClass}">
            <button class="${buttonClass}" onClick="handleEdit(${i})">edit</button>
            <button class="${buttonClass}" onClick="handleDelete(${i})" >delete</button>
        </td>`
    }
    
    if(type=="input"&&e){
        console.log('input',e);
        return `
        <td class="${cellClass}" ><input autocomplete="off" class="${inputClass}" id="i_fName${i}" value="${e.firstName}" type=""text /></td>
        <td class="${cellClass}" ><input autocomplete="off" class="${inputClass}" id="i_mName${i}" value="${e.middleName}" type=""text /></td>
        <td class="${cellClass}" ><input autocomplete="off" class="${inputClass}" id="i_lName${i}" value="${e.lastName}" type=""text /></td>
        <td class="${cellClass}" ><input autocomplete="off" class="${inputClass}" id="i_email${i}" value="${e.email}" type=""text /></td>
        <td class="${cellClass}" ><input autocomplete="off" class="${inputClass}" id="i_phone${i}" value="${e.phone}" type=""text /></td>
        <td class="${cellClass}" ><input autocomplete="off" class="${inputClass}" id="i_address${i}" value="${e.address}" type=""text /></td>
        <td class="${cellClass}" >
            <button class="${buttonClass}" onClick="handleSave(${i})">save</button> 
            <button class="${buttonClass}" onClick="handleCancel(${i})">cancel</button>
        </td>`
    }

    if(type=="title"){
        return`
        <tr>
            <th class="${titleClass}">firstName</th>
            <th class="${titleClass}">middleName</th>
            <th class="${titleClass}">lastName</th>
            <th class="${titleClass}">email</th>
            <th class="${titleClass}">number</th>
            <th class="${titleClass}">address</th>
            <th class="${titleClass}">options</th>
        </tr>
        `
    }
    
}


