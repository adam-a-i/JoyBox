const p = await fetch('http://localhost:5500/api/gifts')
.then(res => {
    res.json().then(data => { 
        console.log(data);
    });
})
.catch(error => {
    console.log(error);
});

console.log(p);
