(async () => {
    console.log(await (await fetch('http://localhost:5500/api/gifts')).json());
})();

