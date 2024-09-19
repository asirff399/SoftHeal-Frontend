function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = {
        day: 'numeric',
        month: 'long',
    };
    return date.toLocaleString('en-US', options).replace(" at", "");
}
const contactUs = (event) => {
    event.preventDefault();

    const form = document.getElementById("contact-us");
    const formData = new FormData(form);
    const postData = {
        name: formData.get("name"),
        email: formData.get("email"),
        body: formData.get("body"),
    };

    console.log(postData);
    const token = localStorage.getItem("token")
        // console.log(token)
    fetch("https://softheal-api-drf.onrender.com/contact_us/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,

            },
            body: JSON.stringify(postData),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            alert("Message sent successfully!");
            window.location.href = "./index.html";
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("There was a problem sending your message.");
        });
};
const loadAllPost = () =>{
    // document.getElementById("loader").style.display = "block";
    fetch("https://softheal-api-drf.onrender.com/post/list/")
    .then((res)=>res.json())
    .then((data)=>{
        if(data.length > 0){
            
            // document.getElementById("loader").style.display = "none";
            displayAllPost(data)
        }
        else{
            // document.getElementById("nodata").style.display = "block";
            // document.getElementById("loader").style.display = "none";
        }
    })
}
const displayAllPost = (posts) => {
    // console.log(posts)
    const parent = document.getElementById("All-post")
    parent.innerHTML = " "
    if (!parent) {
        console.error('Element with ID "All-post" not found');
        return;
    }
    posts.forEach((post) => {
        // console.log(post)
        const div = document.createElement("div")
        div.classList.add("all-post-card")
        const formattedDate = formatDate(post.created_on);
        div.innerHTML = `
                <div class="bg-white rounded overflow-hidden" style="width: 360px;">
                    <img class="h-48 w-full object-cover object-center" src=${post.image} alt="Product Image" />
                    <div class="p-6">
                        <h1><strong class="mb-2 text-xl text-black font-mono font-bold">${post.name}</strong> </h1>
                        <p class="text-red-800 text-[13px] font-bold italic my-2">${formattedDate}</p>
                        <div class="flex justify-between mt-5">
                            <button class="bg-orange-500 text-white font-semibold py-2 px-4 rounded"><a href="./post_details.html?post_id=${post.id}">Donate Now <i class="fa-solid fa-arrow-right-long"></i></a></button>
                        </div>
                        
                    </div>
                </div>
        
        `
        parent.appendChild(div)
    })
}
const loadInitialPost = () => {
    // document.getElementById("loader").style.display = "block";
    fetch("https://softheal-api-drf.onrender.com/post/list/")
        .then((res) => res.json())
        .then((data) => {
            // console.log(data)
            if (data.length > 0) {
                // document.getElementById("loader").style.display = "none";
                displayInitialPost(data.slice(0, 4))
            } else {
                // document.getElementById("nodata").style.display = "block";
                // document.getElementById("loader").style.display = "none";
            }
        })
}
loadInitialPost()
const displayInitialPost = (posts) => {
    // console.log(posts)
    const parent = document.getElementById("initial-post")
    if (!parent) {
        console.error('Element with ID "initial-post" not found');
        return;
    }
    posts.forEach((post) => {
        // console.log(post)
        const div = document.createElement("div")
        div.classList.add("post-card")
        const formattedDate = formatDate(post.created_on);
        div.innerHTML = `
                <div class="bg-white rounded overflow-hidden" >
                    <img class="h-48 w-full object-cover object-center" src=${post.image} alt="Product Image" />
                    <div class="p-6">
                        <h1 ><strong class="mb-2 text-xl text-black font-mono font-bold">${post.name}</strong> </h1>
                        <p class="text-red-800 text-[13px] font-bold italic my-2">${formattedDate}</p>
                        <div class="flex justify-between mt-5">
                            <button class="bg-orange-500 text-white font-semibold py-2 px-4 rounded"><a href="./post_details.html?post_id=${post.id}">Donate Now <i class="fa-solid fa-arrow-right-long"></i></a></button>
                        </div>
                        
                    </div>
                </div>
        
        `
        parent.appendChild(div)
    })
}
const loadTeam = () =>{
    fetch("https://softheal-api-drf.onrender.com/team/")
    .then((res) => res.json())
    .then((data) => {
        // console.log(data)
        data.forEach((team) => {
            const parent = document.getElementById("team")
            if (parent) {
                const div = document.createElement("div")
                div.classList.add("sv-card")
                div.innerHTML = `               
                   <div class="grid grid-cols-3 items-center bg-gray-100 p-4 rounded-lg relative" style="width: 320px;">
                        <div class="col-span-2">
                            <img src=${team.image} class="rounded-lg" style="width: 300px;height:190px;" />
                        </div>

                        <div class="bg-white rounded-lg p-4 absolute right-4 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] ">
                            <h4 class="text-gray-800 text-sm font-bold">${team.name}</h4>
                            <p class="text-gray-800 mt-2 text-xs">${team.work}</p>
                        </div>
                    </div>       
                `
                parent.appendChild(div)
            }
        })
    }) 
}
const loadAllService = () =>{
    fetch("https://softheal-api-drf.onrender.com/service/")
    .then((res) => res.json())
    .then((data) => {
        // console.log(data)
        data.forEach((service) => {
            const parent = document.getElementById("service")
            if (parent) {
                const div = document.createElement("div")
                div.classList.add("sv-card")
                div.innerHTML = `               
                   <div class="bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative group" style="width: 350px;">
                    <img src=${service.image} alt="Blog Post 1" class="w-full h-96 object-cover " />
                    <div class="p-6 absolute bottom-0 left-0 right-0 bg-white opacity-90">
                        <h3 class="text-xl font-bold text-[#333]">${service.title}</h3>
                        <div class="h-0 overflow-hidden group-hover:h-16 group-hover:mt-4 transition-all duration-300">
                        <p class="text-gray-600 text-sm">${service.description}</p>
                        </div>
                    </div>
                   </div>       
            `
                parent.appendChild(div)
            }
        })
    }) 
}
const addVolunteer = async (event) =>{
    event.preventDefault()

    const form = document.getElementById("volunteer")
    const formData = new FormData(form)
    const token = localStorage.getItem("token")

    const imageFile = document.getElementById('image').files[0]

    const imgbbApiKey = 'd66ac61ddd293e9365044261d374f2d1';
    const imgbbUrl = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

    const imageData = new FormData()
    imageData.append('image',imageFile)


    try{
        const imgbbResponse = await fetch(imgbbUrl,{
            method:'POST',
            body: imageData,
        })

        const imgbbData = await imgbbResponse.json()
        const imageUrl = imgbbData.data.url;

        const postData = {
            name:formData.get("name") ,
            email:formData.get("email"),
            image: imageUrl,
            phone: formData.get("phone"),
            gender: formData.get("gender"),
            branch: formData.get("branch"),
        }
        console.log(postData)

        const response = await fetch("https://softheal-api-drf.onrender.com/volunteer/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Token ${token}`,
            },
            body: JSON.stringify(postData),
        })
        const data = await response.json();
        if (response.ok) {
            alert("Register request send successfully");
            window.location.href = "./index.html"
        } else {
            alert("Failed to add post: " + data.message);
        }
    } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while adding the post");
        }
};
function formatDate2(dateStr) {
    const date = new Date(dateStr);
    const options = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric',
        hour12: true 
    };
    return date.toLocaleString('en-US', options).replace(" at", "");
}
const postDetails = ()=>{
    const param = new URLSearchParams(window.location.search).get("post_id")
    localStorage.setItem("post_id",param)
    if(param){
        fetch(`https://softheal-api-drf.onrender.com/post/list/${param}`)
        .then((res)=>res.json())
        .then((data)=> {
            // console.log(data)
            const formattedDate2 = formatDate2(data.created_on);

            document.getElementById("pd-image").src = data.image
            document.getElementById("pd-name").innerText = data.name
            document.getElementById("pd-description").innerText = data.description
            document.getElementById("pd-target").innerText =`$${data.target}`
            document.getElementById("pd-collected").innerText =`$${data.collected}`
            document.getElementById("pd-type").innerText =`${data.post_type}`
            document.getElementById("pd-created-on").innerText = formattedDate2

        })
    }
    
}
const loadAllPostType = () => {
    fetch("https://softheal-api-drf.onrender.com/post/types/")
        .then((res) => res.json())
        .then((data) => {
            // console.log(data)
            data.forEach((type) => {
                const parent = document.getElementById("post-types")
                if (parent) {
                    const div = document.createElement("div")
                    div.classList.add("post-ty")
                    div.innerHTML = `               
                    <li onclick="loadPostCategoryWise('${type.name}')"  class="tab text-gray-600 font-semibold text-[15px] py-2.5 px-5 border-b-2 border-transparent cursor-pointer">
                        ${type.name}
                    </li>          
                `
                    parent.appendChild(div)
                }
            })
        })
}
const loadPostCategoryWise = (search) =>{
    // console.log(search)
    // document.getElementById("loader").style.display = "block";
    fetch(`https://softheal-api-drf.onrender.com/post/list/?search=${search? search : "" }`)
    .then((res)=>res.json())
    .then((data)=>{
        // displayPetCategoryWise(data?.results)
        if(data.length > 0){
            
            // document.getElementById("loader").style.display = "none";
            displayAllPost(data)
        }
        else{
            // document.getElementById("nodata").style.display = "block";
            // document.getElementById("loader").style.display = "none";
            
        }
        
    })
}

loadAllService()
loadTeam()
loadAllPostType()
postDetails()
loadAllPost()
loadPostCategoryWise()
    /* <button type="button" onclick="loadPetCategoryWise('${type.name}')"
                        class="category-btn font-mono font-bold">${type.name}
                    </button>   */