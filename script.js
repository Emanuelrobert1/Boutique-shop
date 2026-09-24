document.addEventListener("DOMContentLoaded",()=>{
  const count=document.getElementById("cartCount");
  const getCart=()=>JSON.parse(localStorage.getItem("shopnow_cart")||"[]");
  const updateCount=()=>{if(count) count.textContent=getCart().length};
  updateCount();

  document.querySelectorAll(".add").forEach(btn=>{
    btn.addEventListener("click",()=>{
      const cart=getCart();
      cart.push(btn.dataset.product||"Produit");
      localStorage.setItem("shopnow_cart",JSON.stringify(cart));
      updateCount();
      const old=btn.textContent;
      btn.textContent="✓ Ajouté";
      setTimeout(()=>btn.textContent=old,1200);
    });
  });

  const toggle=document.querySelector(".menu-toggle"), nav=document.querySelector(".site-header nav");
  if(toggle) toggle.addEventListener("click",()=>nav.classList.toggle("open"));

  const search=document.getElementById("search"), category=document.getElementById("category");
  const filter=()=>{
    document.querySelectorAll("#products .product-card").forEach(card=>{
      const okName=card.dataset.name.toLowerCase().includes((search?.value||"").toLowerCase());
      const okCat=!category||category.value==="all"||card.dataset.category===category.value;
      card.style.display=okName&&okCat?"block":"none";
    });
  };
  if(search) search.addEventListener("input",filter);
  if(category) category.addEventListener("change",filter);

  const form=document.getElementById("contactForm"), msg=document.getElementById("formMessage");
  if(form) form.addEventListener("submit",e=>{
    e.preventDefault();
    msg.textContent="Merci ! Votre message a été préparé. Pour un vrai envoi, connectez le formulaire à un service de formulaire.";
    form.reset();
  });
});