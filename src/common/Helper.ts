export const onSale = (price: number, avePrice: number) => price / avePrice < 0.97

export const createCookie = (name: string, value: string, expiryDays: number) => {
    var expires = "";
    if (expiryDays) {
        var date = new Date();
        date.setTime(date.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    else {
        expires = "; expires=" + new Date(2037,12,31).toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export const getCookie = (name: string) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

export const eraseCookie = (name: string) => {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}