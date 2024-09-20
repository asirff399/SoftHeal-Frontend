const handelRegistration = (event) => {
    event.preventDefault();
   
    const username = getValue("username");
    const first_name = getValue("first_name");
    const last_name = getValue("last_name");
    const email = getValue("email");
    const password = getValue("password");
    const confirm_password = getValue("confirm_password");
   
    const info = {
        username,
        first_name,
        last_name,
        email,
        password,
        confirm_password,
    };
    console.log(info)

    if (password === confirm_password) {
        document.getElementById("error").innerText = "";
        
        if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {          
            
            fetch("https://softheal-api-drf.onrender.com/account/register/",{
                method:"POST",
                headers:{"Content-Type":"application/json",},
                body:JSON.stringify(info)
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to register!");
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                alert("Registration successful");
                document.getElementById("error").innerText = "Check Your Confirmation Mail!";
            })
            .catch((error) => {
                console.error(error);
                alert("Failed to register!");
            });               
        } else {
            document.getElementById("error").innerText = "Password must contain eight characters, at least one letter, one number, and one special character."; 
        }
    } else {
        document.getElementById("error").innerText = "Password and confirm password don't match";
    }
    
};
const getValue=(id)=>{
    const value = document.getElementById(id).value
    return value
}
const handleLogin = (event) =>{
    event.preventDefault()
    const username = getValue("login-username")
    const password = getValue("login-password")
    console.log(username,password)
    if(username,password){
        fetch("https://softheal-api-drf.onrender.com/account/login/",{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify({username,password}),
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            document.getElementById("error").innerText = data.error;
            alert("Logged in Seccessfully !")
             
            if(data.token && data.user_id){
                localStorage.setItem("token",data.token)
                localStorage.setItem("user_id",data.user_id)
                window.location.href = "index.html"
            }
        })
        
    }
}
const handleLogout = () =>{
    const token = localStorage.getItem("token")
    fetch("https://softheal-api-drf.onrender.com/account/logout/",{
        method:"POST",
        headers:{
            Authorization:`Token ${token}`,
            "content-type":"application/json",
        },
    })
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)
        localStorage.removeItem("token")
        localStorage.removeItem("user_id")
        window.location.href = "./index.html"
    })

}
const loadUserDetails = () => {
    const user_id = localStorage.getItem("user_id");
  
    fetch(`https://softheal-api-drf.onrender.com/users/${user_id}`)
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("username", data.username);
        // console.log(data)
        if(data)
        {
            // document.getElementById("p-name").innerText = `${data.first_name} ${data.last_name}`;
            document.getElementById("p-first_name").value = data.first_name 
            document.getElementById("p-last_name").value = data.last_name 
            document.getElementById("p-username").value = data.username
            document.getElementById("p-email").value = data.email
        }
      });
    const custom_id = localStorage.getItem("custom_id");
    fetch(`https://softheal-api-drf.onrender.com/account/list/${custom_id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        if(data)
        {
          document.getElementById("p-phone").value = data.phone
          document.getElementById("p-address").value = data.address
          document.getElementById("p-phone").value = data.phone

          document.getElementById("p-img").src = `${data.image}`;
          
          document.getElementById("p-balance").innerText = `$${data.balance}`;

          localStorage.setItem('user_type',data.user_type)
            
        }
      });
  };
const loadCustomId = () => {
    const user_id = localStorage.getItem("user_id");
    fetch(`https://softheal-api-drf.onrender.com/account/list/?search=${user_id}`)
      .then((res) => res.json())
      .then((data) =>{
        // console.log(data)
        localStorage.setItem("custom_id", data[0].id)   
    })
};
const deposit = (event) => {
    event.preventDefault();
    const form = document.getElementById("deposit-form");
    const formData = new FormData(form);
    const data = {
      amount: formData.get("deposit"),
    };
  
    // console.log(data);
    const token = localStorage.getItem("token");
    fetch("https://softheal-api-drf.onrender.com/transaction/deposit/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Deposit successfully done!");
        window.location.href = "./profile.html";
      })
      
  };
document.addEventListener('DOMContentLoaded', function () {
  const element = document.getElementById('deposit-form');
  if (element) {
    element.addEventListener("submit", deposit);
  }
});
const donation = (event) => {
    event.preventDefault();
    const form = document.getElementById("donation-form");
    const formData = new FormData(form);
    const data = {
      amount: formData.get("donation-amount"),
    };
    const token = localStorage.getItem("token");
    const post_id = localStorage.getItem("post_id");

    fetch(`https://softheal-api-drf.onrender.com/post/donate/${post_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Donated successfully!");
        window.location.href = "./profile.html";
      })
      
  };
// const updateProfile = async (event) => {
//     event.preventDefault(); // Prevent form submission
    
//     const token = localStorage.getItem('token');
//     const imageFile = document.getElementById('image').files[0]; // Get the selected file
//     let imageUrl = '';

//     try {
//         // If a new image is selected, upload it to ImgBB
//         if (imageFile) {
//             const formData = new FormData();
//             formData.append('image', imageFile);

//             const uploadResponse = await fetch('https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY', {
//                 method: 'POST',
//                 body: formData,
//             });

//             const uploadData = await uploadResponse.json();
//             if (uploadData.success) {
//                 imageUrl = uploadData.data.url; // Get the uploaded image URL
//             } else {
//                 throw new Error('Image upload failed');
//             }
//         } else {
//             // If no new image is selected, retain the current image URL
//             imageUrl = document.getElementById('current-image-url').value; // Assuming a hidden input for the current URL
//         }

//         // Prepare user data for updating
//         const userData = {
//             user: {
//                 username: document.getElementById('username').value,
//                 first_name: document.getElementById('first_name').value,
//                 last_name: document.getElementById('last_name').value,
//                 email: document.getElementById('email').value
//             },
//             custom_user: {
//                 image: imageUrl, // Use the uploaded image URL
//                 balance: document.getElementById('balance').value,
//                 phone: document.getElementById('phone').value,
//                 address: document.getElementById('address').value,
//                 user_type: document.getElementById('user_type').value
//             }
//         };

//         // Update the user profile
//         const updateResponse = await fetch('https://your-api-domain.com/profile/update/', {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Token ${token}`
//             },
//             body: JSON.stringify(userData)
//         });

//         const updateData = await updateResponse.json();
//         console.log('Profile updated:', updateData);
//         // Handle success - perhaps redirect or display success message

//     } catch (error) {
//         console.error('Error updating profile:', error);
//     }
// };


document.addEventListener('DOMContentLoaded', function () {
  const element = document.getElementById('donation-form');
  if (element) {
    element.addEventListener("submit", donation);
  }
});
document.addEventListener('DOMContentLoaded', function() {
  loadCustomId()
  loadUserDetails()
});


// const handleReview = async (event) =>{
//     event.preventDefault()
//     const pet_id = new URLSearchParams(window.location.search).get("pet_id")
//     const userId = localStorage.getItem("user_id")
//     const token = localStorage.getItem("token")
//     const message = getValue("message")
//     const ratingValue = getValue("rating")

//     const starRatings = ['✮', '✮✮', '✮✮✮', '✮✮✮✮', '✮✮✮✮✮'];
//     const rating = starRatings[ratingValue - 1];

//     if (!pet_id || !userId || !message || !rating) {
//         console.error("Missing required fields.");
//         return;
//     }

//     const rData = {
//         pet:pet_id,
//         reviewer:userId,
//         body:message,
//         rating:rating,
//     }
//     // console.log(rData)

//     try {
//         const response = await fetch("https://exipet-drf-api.onrender.com/customer/create_review/", {
//             method: "POST",
//             headers:{
//                 "content-type":"application/json",
//                 "Authorization": `Token ${token}`,
//             },
//             body: JSON.stringify(rData),
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             console.error("Error submitting review:", errorData);
//             alert("Failed to submit review: " + JSON.stringify(errorData)); 
//         } else {
//             const data = await response.json();
//             console.log("Review submitted successfully:", data);
//             alert("Review submitted successfully!");
//         }
//     } catch (error) {
//         console.error("Network error:", error);
//         alert("Network error occurred");
//     }
// } 