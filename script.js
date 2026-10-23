// পণ্যের নাম/ছবি/বর্ণনা/দাম এখানে পরিবর্তন করুন। price এখন ০০০ টাকা রাখা হয়েছে।
const products = [
  {name:"কাজু বাদাম", icon:"🥜", desc:"সুস্বাদু ও পছন্দের বাদাম", price:"০০০"},
  {name:"কাঠ বাদাম", icon:"🌰", desc:"দৈনন্দিন খাবারের জন্য", price:"০০০"},
  {name:"আখরোট", icon:"🥜", desc:"পুষ্টিকর বাদাম", price:"০০০"},
  {name:"সানফ্লাওয়ার সিড", icon:"🌻", desc:"সহজে খাওয়ার উপযোগী", price:"০০০"},
  {name:"খাঁটি সরিষার তেল", icon:"🫙", desc:"রান্নার পরিচিত স্বাদ", price:"০০০"},
  {name:"মধু", icon:"🍯", desc:"মিষ্টি স্বাদের প্রাকৃতিক খাবার", price:"০০০"},
  {name:"কালো জিরা", icon:"🌿", desc:"রান্নার পরিচিত উপকরণ", price:"০০০"},
  {name:"খেজুরের গুড়", icon:"🍯", desc:"শীতের বিশেষ আয়োজন", price:"০০০"},
  {name:"খেজুরের রস", icon:"🥥", desc:"মৌসুমি পণ্য", price:"০০০"}
];
const grid = document.getElementById("productGrid");
let selected = null;
function renderProducts(){
  grid.innerHTML = products.map((p,i)=>`
    <article class="product-card">
      <div class="product-image"><small>জনপ্রিয় পণ্য</small><span aria-hidden="true">${p.icon}</span></div>
      <div class="product-info"><h3>${p.name}</h3><p>${p.desc}</p>
        <div class="product-bottom"><span class="price">${p.price} টাকা</span><button class="order-btn" data-index="${i}">অর্ডার করুন +</button></div>
      </div>
    </article>`).join("");
  grid.querySelectorAll("button[data-index]").forEach(btn=>btn.addEventListener("click",()=>openOrder(Number(btn.dataset.index))));
}
function openOrder(index){
  selected = products[index];
  document.getElementById("selectedProduct").textContent = `${selected.name} — ${selected.price} টাকা`;
  document.getElementById("orderModal").classList.add("open");
  document.getElementById("orderModal").setAttribute("aria-hidden","false");
  document.body.classList.add("no-scroll");
}
function closeOrder(){
  document.getElementById("orderModal").classList.remove("open");
  document.getElementById("orderModal").setAttribute("aria-hidden","true");
  document.body.classList.remove("no-scroll");
}
document.getElementById("closeModal").addEventListener("click",closeOrder);
document.getElementById("orderModal").addEventListener("click",e=>{if(e.target.id==="orderModal")closeOrder()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeOrder()});
document.getElementById("orderForm").addEventListener("submit",e=>{
  e.preventDefault();
  if(!selected) return;
  const name=document.getElementById("customerName").value.trim();
  const phone=document.getElementById("customerPhone").value.trim();
  const address=document.getElementById("customerAddress").value.trim();
  const quantity=document.getElementById("quantity").value;
  const area=document.getElementById("deliveryArea").value;
  const delivery=area==="ঢাকার মধ্যে" ? 70 : 130;
  const message=`ফয়সাল অর্গানিক ফুডে নতুন অর্ডার%0Aপণ্য: ${selected.name}%0Aদাম: ${selected.price} টাকা (দাম নিশ্চিত করতে হবে)%0Aপরিমাণ: ${quantity}%0Aনাম: ${name}%0Aমোবাইল: ${phone}%0Aঠিকানা: ${address}%0Aএলাকা: ${area}%0Aডেলিভারি চার্জ: ${delivery} টাকা`;
  window.open(`https://wa.me/8801605528973?text=${message}`,"_blank","noopener");
});
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("nav").classList.toggle("show"));
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("nav").classList.remove("show")));
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();
