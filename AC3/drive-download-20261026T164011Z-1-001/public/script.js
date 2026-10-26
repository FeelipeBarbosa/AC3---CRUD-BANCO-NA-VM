const API='http://localhost:3000/alunos';

const form=document.getElementById('form');
const lista=document.getElementById('lista');

async function load(){
 const res=await fetch(API);
 const data=await res.json();
 lista.innerHTML='';
 data.forEach(a=>{
  lista.innerHTML+=`
  <tr>
   <td>${a.id}</td>
   <td>${a.nome}</td>
   <td>${a.email}</td>
   <td>${a.curso}</td>
   <td>
    <button onclick="edit(${a.id},'${a.nome}','${a.email}','${a.curso}')">Editar</button>
    <button onclick="del(${a.id})">Excluir</button>
   </td>
  </tr>`;
 });
}

form.onsubmit=async e=>{
 e.preventDefault();
 const aluno={
  nome:nome.value,
  email:email.value,
  curso:curso.value
 };

 if(id.value){
  await fetch(API+'/'+id.value,{
   method:'PUT',
   headers:{'Content-Type':'application/json'},
   body:JSON.stringify(aluno)
  });
 }else{
  await fetch(API,{
   method:'POST',
   headers:{'Content-Type':'application/json'},
   body:JSON.stringify(aluno)
  });
 }

 form.reset();
 id.value='';
 load();
};

function edit(i,n,e,c){
 id.value=i;
 nome.value=n;
 email.value=e;
 curso.value=c;
}

async function del(i){
 await fetch(API+'/'+i,{method:'DELETE'});
 load();
}

load();
