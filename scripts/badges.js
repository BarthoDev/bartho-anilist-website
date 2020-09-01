/* ============= VARIABLES ============= */

let data = (function() {
  var json = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': "/data/badges.json",
    'dataType': "json",
    'success': function(data) {
      json = data;
    }
  });
  return json;
})()
let buttons = [
      "card",
      "cover"
    ]

/* ============= FUNCTIONS ============= */

function buildContent(type) {
  
  if (type === "participations") {

    document.getElementsByClassName("global-container")[0].innerHTML = `
    
      <div participations class="container"> 

        <ul participations class="categories">
        ${data.badges.participations.map(cat => 
            `
            <li participations class="category">
              <div participations class="title">${cat.name}</div>
              <ul participations class="elements">
                ${cat.list.map(element => 
                  `
                  <li participations class="element">
                    <div participations class="date">${element.date}</div>
                    <div participations class="image" style="background:url('${element.image}') center/100%"></div>
                  </li>
                  `
                ).join("")}
              </ul>
              <div participations class="button-next"></div>
            </li>
            `
        ).join("")}
        </ul>
      </div>
    `;

  }

  else if (type === "tags") {

    let tags = Object.keys(data.badges.tags)
    tags.shift()

    document.getElementsByClassName("global-container")[0].innerHTML = `
  
      <div tags class="container">

        <ul tags class="categories">

          ${tags.map(val => 
            `
            <li tags class="category">
              <div tags class="title">${val.split("_").join(" ")}</div>
              <ul tags class="elements">
                <li tags class="element${data.badges.tags.owned.indexOf(`${val}.25`)>-1?" unlocked":" locked"}"> <div tags class="element" style="background:url('${data["badges"]["tags"][val]["25"][data.badges.tags.owned.indexOf(`${val}.25`)>-1?"unlocked":"locked"]}') center/104%; ${data.badges.tags.owned.indexOf(`${val}.25`)>-1?"opacity:1;	border: 4px solid #c69c6d;":"opacity:0.5"}"></div> </li>
                <li tags class="element${data.badges.tags.owned.indexOf(`${val}.100`)>-1?" unlocked":" locked"}"> <div tags class="element" style="background:url('${data["badges"]["tags"][val]["100"][data.badges.tags.owned.indexOf(`${val}.100`)>-1?"unlocked":"locked"]}') center/104%; ${data.badges.tags.owned.indexOf(`${val}.100`)>-1?"opacity:1;	border: 4px solid #c69c6d;":"opacity:0.5"}"></div> </li>
              </ul>
            </li>
            `
          ).join("")}
        </ul>
      </div>

    `

  }

    else if (type === "stats") {

    document.getElementsByClassName("global-container")[0].innerHTML = `
  
      <div stats class="container">

        <ul stats class="categories">

          ${data.badges.stats.map(category => 
            `
            <li stats class="category">
              <div stats class="title">${category.name}</div>
              <ul stats class="elements">
                ${category.list.map((val,i) => 
                  `
                  <li stats class="element${i==category.list.length-1?"":" unlocked"}"> <div stats class="image" style="background: url('${val}') center/104%;${i==category.list.length-1?`opacity:0.5;`:""}"> </div> </li>
                  `
                ).join(" ")}
              </ul>
            </li>
            `
          ).join("")}
        </ul>
      </div>

    `

  }

  else if (type === "genres") {

    let colors = [
      "b56728", //bronze
      "a1a1a1", //silver
      "c69c6d" //gold
    ]

    document.getElementsByClassName("global-container")[0].innerHTML = `
  
      <div genres class="container">


        <ul genres class="categories">

          ${data.badges.genres.map(category => 
            `
            <li genres class="category">
              <div genres class="title">${category.name}</div>
              <ul genres class="elements">
                ${category.images.map((val,i) => 
                  `
                  <li genres class="element">
                    <div genres class="text">${Object.values(category.amount)[i]}</div>
                    <div genres class="image ${i<category.level?"unlocked":"locked"}" style="border:4px solid #${colors[i]}; ${i<category.level?`background: url('${val}') center/104%`:`background: url('https://i.postimg.cc/1zMCGzFd/Blank-Genre-Card.png') center/104%; opacity: 0.25;`}"> </div>
                  </li>
                  `  
                ).join(" ")}
              </ul>
            </li>
            `
          ).join("")}
        </ul>
      </div>

    `

  }

  else if (type === "awc") {
    document.getElementsByClassName("global-container")[0].innerHTML = ``

  }


};









function onClick(button) {

  console.log(document.getElementsByClassName("nav-container")[0].innerHTML)
  document.getElementsByClassName("nav-container")[0].innerHTML = document.getElementsByClassName("nav-container")[0].innerHTML.replace(" selected", "").replace(`nav ${button}`, `nav ${button} selected`)
  console.log(document.getElementsByClassName("nav-container")[0].innerHTML)

  buildContent(button)
}







  