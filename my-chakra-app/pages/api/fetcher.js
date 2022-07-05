export async function fetcher(url, data) {
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

    return (await fetch(url, options)).json();
}