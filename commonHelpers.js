import{a as f,S as L,i as d}from"./assets/vendor-6e0bf343.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const b="43770343-d10c460472ef62dd19f425fcf";async function S(o,s,r){const i=new URLSearchParams({key:b,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:s,page:r});return f.defaults.baseURL="https://pixabay.com/api/",await f(`?${i}`)}function v(o){const s=o.map(({largeImageURL:r,webformatURL:i,tags:e,likes:t,views:n,comments:y,downloads:g})=>`<li class="item-results">
          <a href="${r}" class="gallery-link">
            <img src="${i}" alt="${e}" class="gallery-img"/>
          </a>
          <div class="wrap-info">
            <ul class="list-info">
              <li class="item-info">
                <p class="headline-info">Likes</p>
                <p class="text-info">${t}</p>
              </li>
              <li class="item-info">
                <p class="headline-info">Views</p>
                <p class="text-info">${n}</p>
              </li>
              <li class="item-info">
                <p class="headline-info">Comments</p>
                <p class="text-info">${y}</p>
              </li>
              <li class="item-info">
                <p class="headline-info">Downloads</p>
                <p class="text-info">${g}</p>
              </li>
            </ul>
          </div>
        </li>`).join("");document.querySelector(".list-results").insertAdjacentHTML("beforeend",s)}const w=new L(".gallery-link",{captionsData:"alt",captionDelay:250}),q=document.querySelector(".form-search-img"),P=document.querySelector(".search-input"),m=document.querySelector(".list-results"),a=document.querySelector(".load-more-btn"),u=document.querySelector(".loader");let l="",c=1,p=15;function h(o,s,r){return S(o,s,r).then(({data:i})=>{if(i.hits.length===0)return d.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});v(i.hits),w.refresh(),a.classList.remove("is-hidden");const e=Math.ceil(i.totalHits/s);r>=e&&(d.warning({message:"We`re sorry, but you`ve reached the end of search results.",position:"topRight"}),a.classList.add("is-hidden"))}).catch(i=>console.log(i)).finally(()=>{u.classList.add("is-hidden")})}function R(o){if(o.preventDefault(),l=P.value.trim(),o.target.reset(),!l)return d.warning({message:"The field cannot be empty!",position:"topRight"});u.classList.remove("is-hidden"),m.innerHTML="",c=1,h(l,p,c)}async function x(){c+=1,a.classList.add("is-hidden"),u.classList.remove("is-hidden"),await h(l,p,c),$()}function $(){const s=m.querySelector(".item-results:last-child").getBoundingClientRect().height;window.scrollBy({top:s*2,left:0,behavior:"smooth"})}q.addEventListener("submit",R);a.addEventListener("click",x);
//# sourceMappingURL=commonHelpers.js.map
