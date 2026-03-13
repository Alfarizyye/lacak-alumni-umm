function tracking(){

let sumber=[

"Google Scholar",
"LinkedIn",
"ResearchGate",
"Company Website",
"GitHub"

]

let hasil=[]

sumber.forEach(s=>{

if(Math.random()>0.5){
hasil.push(s)
}

})

return hasil

}