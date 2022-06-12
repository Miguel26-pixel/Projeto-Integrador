export async function fetcher(url, data) {
    console.log(data);
    let options = {
        method : data ? "POST" : "GET",
        credentials : "include",
        headers: {
            "Content-Type" : "application/json",
        },
    }

    if(options.method === 'POST') {
        options.body = JSON.stringify(data);
    }
    console.log(url)

    return (await fetch(url, options)).json()
}