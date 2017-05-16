
//JSON to TABLE
//https://github.com/afshinm/Json-to-HTML-Table
function ConvertJsonToTable(parsedJson,tableId,tableClassName,linkText){var italic="<i>{0}</i>";var link=linkText?'<a href="{0}">'+linkText+"</a>":'<a href="{0}">{0}</a>';var idMarkup=tableId?' id="'+tableId+'"':"";var classMarkup=tableClassName?' class="'+tableClassName+'"':"";var tbl='<table border="1" cellpadding="1" cellspacing="1"'+idMarkup+classMarkup+">{0}{1}</table>";var th="<thead>{0}</thead>";var tb="<tbody>{0}</tbody>";var tr="<tr>{0}</tr>";var thRow="<th>{0}</th>";var tdRow="<td>{0}</td>";var thCon="";var tbCon="";var trCon="";if(parsedJson){var isStringArray=typeof parsedJson[0]=="string";var headers;if(isStringArray)thCon+=thRow.format("value");else{if(typeof parsedJson[0]=="object"){headers=array_keys(parsedJson[0]);for(i=0;i<headers.length;i++)thCon+=thRow.format(headers[i])}}th=th.format(tr.format(thCon));if(isStringArray){for(i=0;i<parsedJson.length;i++){tbCon+=tdRow.format(parsedJson[i]);trCon+=tr.format(tbCon);tbCon=""}}else{if(headers){var urlRegExp=new RegExp(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig);var javascriptRegExp=new RegExp(/(^javascript:[\s\S]*;$)/ig);for(i=0;i<parsedJson.length;i++){for(j=0;j<headers.length;j++){var value=parsedJson[i][headers[j]];var isUrl=urlRegExp.test(value)||javascriptRegExp.test(value);if(isUrl)tbCon+=tdRow.format(link.format(value));else{if(value){if(typeof value=="object"){tbCon+=tdRow.format(ConvertJsonToTable(eval(value.data),value.tableId,value.tableClassName,value.linkText))}else{tbCon+=tdRow.format(value)}}else{tbCon+=tdRow.format(italic.format(value).toUpperCase())}}}trCon+=tr.format(tbCon);tbCon=""}}}tb=tb.format(trCon);tbl=tbl.format(th,tb);return tbl}return null}function array_keys(e,t,n){var r=typeof t!=="undefined",i=[],s=!!n,o=true,u="";if(e&&typeof e==="object"&&e.change_key_case){return e.keys(t,n)}for(u in e){if(e.hasOwnProperty(u)){o=true;if(r){if(s&&e[u]!==t)o=false;else if(e[u]!=t)o=false}if(o)i[i.length]=u}}return i}String.prototype.format=function(){var e=arguments;return this.replace(/{(\d+)}/g,function(t,n){return typeof e[n]!="undefined"?e[n]:"{"+n+"}"})}


var filearr = [];
var tablearr = [];
var editor;
document.getElementById('editor').style.height = document.getElementById('main').offsetHeight+"px";

var modemapping = {"text/javascript":"javascript","text/css":"css","application/json":"json","text/html":"html"}
var currentmode = "text/html";

var output = document.getElementById("output");
var braw = document.getElementById("raw");
var bcopy = document.getElementById("copy");


braw.addEventListener("click", function(e){
    var code = editor.getValue();
    var blob = new Blob([code], {type: currentmode});
    var url = URL.createObjectURL(blob);
    window.open(url, '_blank');
}, false);



//YOU CAN ALSO GLUE: https://github.com/zeroclipboard/zeroclipboard/blob/master/docs/instructions.md#gluing
var clip = new ZeroClipboard(bcopy, {moviePath: 'js/ZeroClipboard.swf' });

clip.on('mousedown', function(client){
    clip.setText(editor.getValue());
});

clip.on('complete',function(client, args){
    console.log("Copied");
});





function show(result){
    output.innerHTML = ConvertJsonToTable(result, 'jsonTable', null, 'Download');
}


function process(filename){

    //check if blob via typeof filename param (for blob objects coming from a zip)
    if(typeof filename == "number"){
        var file = filearr[filename];
    } else {
        
        var file = filearr.filter(function(f){return f.name==filename })[0];
    }

    var reader = new FileReader();

    reader.onload = function(e) {

        currentmode = modemapping[file.type] || "text";

        editor = ace.edit("editor");
        editor.getSession().setMode("ace/mode/"+currentmode);
        editor.setValue(reader.result);

        bcopy.style.display = "block";
        braw.style.display = "block";

    }

    reader.readAsText(file);

}




var count = 0;

function traverseFileTree(item, path, total) {
  path = path || "";
  if (item.isFile) {
    // Get file
    item.file(function(file) {
        count++;
        upload(file);

        if(count==total){
            show(tablearr);
        }
    });

  } else if (item.isDirectory) {
    // Get folder contents
    var dirReader = item.createReader();
    dirReader.readEntries(function(entries) {

      for (var i=0; i<entries.length; i++) {
        traverseFileTree(entries[i], path + item.name + "/",entries.length);
      }
    });
  }
}
 




            /* Main unzip function */
            function unzip(zip){
                model.getEntries(zip, function(entries) {
                    entries.forEach(function(entry) {
                        model.getEntryFile(entry, "Blob");
                    });
                });
            }

            /* Drag'n drop stuff */
            var drag = document.getElementById("drag");
            
            drag.ondragover = function(e){
                e.preventDefault()
            };


            drag.ondrop = function(e) {
                e.preventDefault();
                  
                  var length = e.dataTransfer.items.length;
                  for (var i = 0; i < length; i++) {
                    var entry = e.dataTransfer.items[i].webkitGetAsEntry();
                    var file = e.dataTransfer.files[i];
                    var zip = file.name.match(/\.zip/);
                    if (entry.isFile) {
                        if(zip){
                            unzip(file);
                        } else {
                          var file = e.dataTransfer.files[i];
                          upload(file);
                        }

                        if(i==length-1){
                            show(tablearr);
                        }

                    } else if (entry.isDirectory) {
                     traverseFileTree(entry);
                    } else {
                        output.innerHTML = "Error. Only zip files are extracted."; 
                    }


                  }
            }




            var files = document.getElementById("filesinput");
            var directory = document.getElementById("directoryinput");
            var zipinput = document.getElementById("zipinput");
            var fbutton = document.getElementById("fbutton");
            var dbutton = document.getElementById("dbutton");
            var zbutton = document.getElementById("zbutton");

            //process files
            files.addEventListener("change", function (e) {
                var files = e.target.files;
                for(i=0; i<files.length; i++) {
                    var file = files[i];

                    upload(file);

                    if(i==files.length-1){
                        show(tablearr);
                    }
                }
            }, false);





            //process directory
            directory.addEventListener("change", function (e) {
                var files = e.target.files;
                for (var i=0; i<files.length; i++) {
                    var file = files[i];
                    
                    upload(file);

                    if(i==files.length-1){
                        show(tablearr);
                    }
                }            
            }, false);






            //process zip archive
            zipinput.addEventListener('change', function() {
                unzip(zipinput.files[0]);
                console.log("can we process show()?")
            }, false);


            fbutton.addEventListener("click", function() {
                document.getElementById('filesinput').click();
            }, false);

            dbutton.addEventListener("click", function() {
                document.getElementById('directoryinput').click()
            }, false);

            zbutton.addEventListener("click", function() {
                document.getElementById('zipinput').click()
            }, false);


            /* main upload function that sends images to imgur.com */
            function upload(file) {

                filearr.push(file);
                tablearr.push({
                    "name":file.name,
                    "type":file.type,
                    "size":file.size,"view":"<button onclick='process(\""+file.name+"\");return false;'>open</button>"
                });

            }


            //model for zip.js
            //https://github.com/gildas-lormeau/zip.js

            var model = (function() {

                var URL = window.webkitURL || window.mozURL || window.URL;
                var acount = 0;
                var bcount = 0;

                //compile a list of file extensions and content types
                //http://webdesign.about.com/od/multimedia/a/mime-types-by-content-type.htm
                var mapping = {
                    "pdf":"application/pdf",
                    "zip":"application/zip",
                    "rar":"application/rar",
                    "json":"application/json",
                    "mid":"audio/mid",
                    "mp3":"audio/mpeg",
                    "bmp":"image/bmp",
                    "gif":"image/gif",
                    "png":"image/png",
                    "jpg":"image/jpeg",
                    "jpeg":"image/jpeg",
                    "svg":"image/svg+xml",
                    "xml":"text/xml"
                }


                return {
                    getEntries : function(file, onend) {

                        zip.createReader(new zip.BlobReader(file), function(zipReader) {
                            zipReader.getEntries(onend);
                        }, onerror);
                    },
                    getEntryFile : function(entry, creationMethod, onend, onprogress) {

                        acount++;

                        var writer, zipFileEntry;

                        function getData() {
                            entry.getData(writer, function(blob) {

                                bcount++;

                                filearr.push(blob);

                                tablearr.push({
                                    "name":entry.filename,
                                    "type":blob.type,
                                    "size":blob.size,
                                    "view":"<button onclick='process("+Number(bcount-1)+")'>open</button>"
                                });
                                

                                if(acount == bcount){
                                    show(tablearr);
                                }
                         
                            }, onprogress);
                        }
                            
                        var extension = entry.filename.substring(entry.filename.indexOf(".")+1);
                        var mime = mapping[extension] || 'text/plain';

                        writer = new zip.BlobWriter(mime);
                        getData();

                    }
                };
            })();



