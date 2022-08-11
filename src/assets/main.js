//Llamado a api de youtube
const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCQzdMyuz0Lf4zo4uGcEujFw&part=snippet%2Cid&order=date&maxResults=10';

const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9e5510bf51msh95f50131f6ebe23p1d538ajsnd17a352fe763', //La key no se debe compartir con nadie
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

/*
fetch(API, options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
*/
const fetchData = async (urlApi) => {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

(async () => {
  try{
    const videos = await fetchData(API);
    //Generamos un template
    let view = `
      ${videos.items.map(video => `
        <div class="group relative">
          <div
            class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
            <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
          </div>
          <div class="mt-4 flex justify-between">
            <h3 class="text-sm text-gray-700">
              <span aria-hidden="true" class="absolute inset-0"></span>
              ${video.snippet.title}
            </h3>
          </div>
        </div>
      `      
      ).slice(0,8).join('')}     
    `; //con slice solo pasamos una cantidad de los elementos
      //con join('') unimos todos los elementos
      content.innerHTML = view;
      console.log(content);
  }catch (error){
    console.log(error);
  }
})(); //Funcion anonima autoejecutable