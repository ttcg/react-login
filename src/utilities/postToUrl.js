export default function postToUrl(url, params) {
    let form = document.createElement("form");
    form.method = 'POST';
    form.action = url;

    for (let i in params) {
        if (params.hasOwnProperty(i)) {
            let input = document.createElement('input');
            input.type = 'hidden';
            input.name = i;
            input.value = params[i];
            form.appendChild(input);
        }
    }

    document.body.appendChild(form);

    form.submit();

    document.body.removeChild(form);
}