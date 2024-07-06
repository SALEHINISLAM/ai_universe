
const loadData=async (isShowMore,sort)=>{
    const response=await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data= await response.json();

    if (sort===true) {
        sortByDate(data);
    }    
    displayAi(data.data,isShowMore);
}
function sortByDate(data){
    return data.tools.sort((a,b)=>new Date(a.published_in)-new Date(b.published_in));
}
document.getElementById('sort').addEventListener('click',function(){
    loadData(true,true);
})

const cardContainer=document.getElementById('card-container');


const displayAi=(dataAi,isShowMore)=>{
    cardContainer.textContent='';
    //console.log(dataAi.tools)
    if (dataAi.tools.length>8 && !isShowMore) {
        dataAi.tools=dataAi.tools.slice(0,6);
    }
    dataAi.tools.forEach(datum=>{
        //const datu=datum;
        if (datum.id==6) {
            datum.image=`https://cdn.prod.website-files.com/60e5f2de011b86acebc30db7/6674e70ba41e6b77620c3410_Social%20Share%20Image%20-%20Chat.png`
        }
        if(datum.id==11){
            datum.image=`https://cdn-www.bluestacks.com/bs-images/featured_ai.replika.app.jpg`;
        }
        console.log(datum);
        const div=document.createElement('div');
        div.classList.add("card", "bg-base-100", "shadow-xl", "m-2");
        div.innerHTML=`
        <figure class="px-10 pt-10">
          <img
            src="${datum.image}"
            alt="ai"
            class="rounded-xl" />
        </figure>
        <div class="card-body items-start text-left">
          <h2 class="card-title">Features</h2>
          <ol class="list-decimal text-left pl-3">
            <li>${datum.features[0]}</li>
            <li>${datum.features[1]}</li>
            <li>${datum.features[2]}</li>
          </ol>
          <hr style="border: 1px solid rgba(128, 128, 128, 0.479); width: 100%;">
          <div class="card-actions flex justify-between w-full">
            <div class="flex flex-col">
                <h2 class="card-title">${datum.name}</h2>
            <p class="flex items-center"><svg class="inline" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.75 3V5.25M17.25 3V5.25M3 18.75V7.5C3 6.90326 3.23705 6.33097 3.65901 5.90901C4.08097 5.48705 4.65326 5.25 5.25 5.25H18.75C19.3467 5.25 19.919 5.48705 20.341 5.90901C20.7629 6.33097 21 6.90326 21 7.5V18.75M3 18.75C3 19.3467 3.23705 19.919 3.65901 20.341C4.08097 20.7629 4.65326 21 5.25 21H18.75C19.3467 21 19.919 20.7629 20.341 20.341C20.7629 19.919 21 19.3467 21 18.75M3 18.75V11.25C3 10.6533 3.23705 10.081 3.65901 9.65901C4.08097 9.23705 4.65326 9 5.25 9H18.75C19.3467 9 19.919 9.23705 20.341 9.65901C20.7629 10.081 21 10.6533 21 11.25V18.75M12 12.75H12.008V12.758H12V12.75ZM12 15H12.008V15.008H12V15ZM12 17.25H12.008V17.258H12V17.25ZM9.75 15H9.758V15.008H9.75V15ZM9.75 17.25H9.758V17.258H9.75V17.25ZM7.5 15H7.508V15.008H7.5V15ZM7.5 17.25H7.508V17.258H7.5V17.25ZM14.25 12.75H14.258V12.758H14.25V12.75ZM14.25 15H14.258V15.008H14.25V15ZM14.25 17.25H14.258V17.258H14.25V17.25ZM16.5 12.75H16.508V12.758H16.5V12.75ZM16.5 15H16.508V15.008H16.5V15Z" stroke="#585858" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>${datum.published_in}
                </p>
            </div>
            <button class="btn bg-transparent btn-circle border-none" onclick="show_modal.showModal(); loadModalContent('${datum.id}')"><svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25" cy="25" r="25" fill="#FEF7F7"/>
                <path d="M17.5 25H32.5M32.5 25L25.75 18.25M32.5 25L25.75 31.75" stroke="#EB5757" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                </button>
          </div>
        </div>`
        cardContainer.appendChild(div);
        document.getElementById('see-more').classList.remove('hidden');
        loadModalContent(datum.id);
    })
}

const loadModalContent=async(id)=>{
    const response=await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data=await response.json();
    //console.log(id);
    updateModalContent(data);
}

const updateModalContent=(data)=>{
    //console.log(data.data.image_link);
  document.getElementById('card-title').innerText=data.data.input_output_examples[0].input;
  document.getElementById('ans').innerText=data.data.input_output_examples[0].output;
  document.getElementById('in-li1').innerText=data.data.integrations[0];
  document.getElementById('in-li2').innerText=data.data.integrations[1];
  document.getElementById('in-li3').innerText=data.data.integrations[2];
  document.getElementById('f-li1').innerText=`${data.data.features[1].feature_name}`;
  document.getElementById('f-li2').innerText=`${data.data.features[2].feature_name}`;
  document.getElementById('f-li3').innerText=`${data.data.features[3].feature_name}`;
  document.getElementById('price-1').innerText=`${data.data.pricing[0].plan}
  ${data.data.pricing[0].price}`;
  document.getElementById('price-2').innerText=`${data.data.pricing[1].plan}
  ${data.data.pricing[1].price}`;
  document.getElementById('price-3').innerText=`${data.data.pricing[2].plan}
  ${data.data.pricing[2].price}`;
  document.getElementById('modal-title').innerText=data.data.description;
  //document.getElementById('show_modal').appendChild(div);
}

const seeMore=()=>{
    //console.log(true);
    loadData(true,false);
    document.getElementById('see-more').classList.add('hidden');
}

loadData(false,false);