fetch("/product", {
  method: "POST",
  headers : {
    "Content-Type" : "application/json"    
  },
  body: JSON.stringify({ name: "123苹果" }),
}).then((resp) => console.log(resp.status))



fetch("/product", {
  method: "POST",
  headers : {
    "Content-Type" : "application/json"    
  },
  body: JSON.stringify({ name: "".padStart(100000, "A")}),
}).then((resp) => console.log(resp.status))

