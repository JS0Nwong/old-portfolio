window.onload = function()
{
    let scriptPath = ['index.js'];

    scriptLoader(scriptPath);

    function scriptLoader(scriptPath)
    {
        let typeOfPath = typeof path;
        switch(typeOfPath)
        {
            case "object":
                var body = document.getElementsByTagName("script")[0];
                for(let i = 0; i < path.length; i++)
                {
                    var link = document.createElement("script");
                    link.type = 'text/javascript';
                    link.async = true;
                    link.src = scriptPath[i];
                    body.appendChild(link);
                }
                break;
            case "string":
                var body = document.getElementsByTagName("script")[0];
                var link = document.createElement("script");
                link.src = scriptPath;
                link.type = 'text/javascript';
                link.async = true;
                body.appendChild(link);
                break;
        }
    }
}