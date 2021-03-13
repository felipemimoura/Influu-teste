const baseURL = "https://reqres.in/api/users";

const http = require('http')
const fs = require('fs')
const fetch = require("node-fetch");

const server = http.createServer()

server.on('request',  (request, response) => {  
});

server.listen(3000)
console.log('Server is running.');
getInfoUser(baseURL)


async function getInfoUser(url) {
  // console.log('dentro do Get info' ,url)

  const dados = await fetch(url).then((res) => res.json());
  

  const infoData = await getInfoApi(url, dados.page, dados.total_pages);
  const user = infoData.map((user) =>{
      return {id: user.id, email: user.email, fullName:user.first_name + " " +  user.last_name, avatar: user.avatar}
  })
  fs.writeFile(__dirname + '/userInfo.csv', JSON.stringify(user), err =>{
    console.log(err || 'Arquivo Gerado')
  })
  fs.writeFile(__dirname + '/userFoto.png', JSON.stringify(user.avatar), err =>{
    console.log(err || 'Arquivo Gerado')
  })
}

async function getInfoApi(url, pages, totalPages) {
    let userInfo = []
  for (let i = pages; i <= totalPages; i++) {
    const data = await fetch(`${url}?page=${i}`).then(res => res.json());
    userInfo.push(...data.data)

  }
  return userInfo;
}


