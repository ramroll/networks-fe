const puppeteer = require('puppeteer')

const queue = ['https://www.bilibili.com']
function findCards() {
  return new Promise((resolve, reject) => {
    function next(n, callback) {
      if (n > 0) {
        window.scrollBy(0, window.innerHeight)
      } else {
        callback()
        return
      }

      setTimeout(() => {
        next(n - 1, callback)
      }, 1000)
    }
    next(2, () => {
      const cards = document.querySelectorAll(
        ".video-card-common"
      )
      function getText(node, cls) {
        if (node.querySelector(cls)) {
          return node.querySelector(cls).innerText
        }
        return null
      }
      try {
        resolve(
          [...cards].map((card) => {
            if(!card.innerHTML) {
              return
            }
            let title =
              getText(card, ".ex-title") ||
              getText(card, ".title")
            let up =
              getText(card, ".ex-up") ||
              getText(card, ".up")

            const href = card.querySelector("a").href
            return { title, up, href }
          })
        )
      }catch(ex) {
        reject(ex)
      }
    })
  })
}
async function start(){
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  while(queue.length > 0) {
    const url = queue.pop()
    const data = await analyse(page, url)
    store(data)
  }

}

function store(data) {
  console.log(data)
}

async function analyse(page, url) {
  await page.goto(url)
  if(url === 'https://www.bilibili.com') {
    const cards = await page.evaluate(findCards)
    cards.forEach(card => {
      card &&queue.push(card.href)
    })
    return cards
  } else {
    console.log('analyze page:' + url)
  }
}

start()