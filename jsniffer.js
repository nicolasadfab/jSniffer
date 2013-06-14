function logTitle(tt)
{
    console.log("%c > " + tt, "color:red; font-weight:bold; font-size: 16px;");
}

function log(str1, str2)
{
    console.log("%c" + str1 + " : ",
        "color:blue; font-weight:bold; font-size: 12px;"
    );
    console.log(str2);
}

var xhrListn = new Object();
xhrListn.open = window.XMLHttpRequest.prototype.open;
xhrListn.send = window.XMLHttpRequest.prototype.send;

window.XMLHttpRequest.prototype.open = function (a, b)
{
    if (!a) var a = '';
    if (!b) var b = '';
    
    logTitle("XMLHttpRequest open");
    log('OPEN URL', b);
    log(typeof this + "", this);
    if (this.responseText !== null && this.responseText !== '') {
        log('responseText', this.responseText);
    }
    if (this.responseXML !== null && this.responseXML !== '') {
        log('responseXML', this.responseXML);
    }
    if (this.status !== null && this.status !== '') {
        log('status', this.status);
    }
        
    if (a.toLowerCase() === 'get') {
        var d = b.split('?'),
            d = d[1],
            tab = d.split('&'), i, subTab;
        for(i in tab) {
            subTab = tab[i].split('=');
            console.log(subTab[0] +  ' = ' + subTab[1]);
        }
    }
    
    xhrListn.open.apply(this, arguments);
    xhrListn.method = a;
    xhrListn.url = b;
    if (a.toLowerCase() === 'get') {
        xhrListn.data = b.split('?');
        xhrListn.data = xhrListn.data[1];
    }
};

window.XMLHttpRequest.prototype.send = function (a, b)
{
    if (!a) var a = '';
    if (!b) var b = '';
    xhrListn.send.apply(this, arguments);
    
    if(xhrListn.method.toLowerCase() === 'post') {
        xhrListn.data = a;
    }
};

window.onreadystatechange = function (e)
{
    logTitle("onreadystatechange");
    var target = e.target;
    if (target.readyState === 'complete') {
        log(target.readyState, e);
    }
};