
var href0='http://www.nndc.bnl.gov/nudat3/getdataset.jsp?nucleus=';
var href1='&unc=nds';
var hrefDataDecay0='http://www.nndc.bnl.gov/nudat3/decaysearchdirect.jsp?nuc=';
var hrefDataDecay1='&unc=nds';

//to link to the IAEA-Livechart, uncomment following 2 lines
//href0='http://nds.iaea.org/relnsd/NdsEnsdf/nuclide.jsp?NUCID='
//hrefDataDecay0='http://nds.iaea.org/relnsd/NdsEnsdf/nuclide.jsp?NUCID='


function kwdhlp(code,help) {
    this.code=code;
    this.help=help;
}

//selected EXFOR Keywords, which require explanation via tool-tip
kwhlp=[
     new kwdhlp('DECAY-MON'	, 'Standard decay data')
    ,new kwdhlp('MONITOR'	, 'Standard')
    ,new kwdhlp('EN-SEC'	, 'Secondary energy')
    ,new kwdhlp('INC-SOURCE'	, 'Incident particle source')
    ,new kwdhlp('INC-SPECT'	, 'Incident spectrum')
    ,new kwdhlp('HISTORY'	, 'History of this ENTRY in EXFOR library')
];

    function outX4kw(kw0)
    {
	var kw,help;
//	document.write(kw0);
	kw=delSpaces(kw0);
//	if (kw=='SUBENT') document.write("<tt class=lf>\n</tt>");
	help=getKeywordHelp(kw);
	if (help=='') {
	    document.write(kw0);
	    return;
	}
	document.writeln('<a href="javascript:akwlink(\''+kw+'\')" ');
	document.writeln(' class="kw" ');
	document.writeln(' title="'+help+'" ');
//	document.writeln(' onmouseover="javascript:startTipSIG('+mf+')" ');
//	document.writeln(' onmouseout="javascript:stopTip()" ');
	document.write('>');
	document.write(kw0);
	document.write('</a>');
    }

    function delSpaces(str0) {
	var i,n,ll,str;
        //alert(' addIt: ['+str+'] to:['+str0+']');
	str=str0;
	ll=str.length;
        for (n=0, i=0; n<ll; n++) {
	    if (str.charAt(i)==' ') {
		str=str.substring(0,i)+str.substring(i+1,str.length);
		//break;
	    }
	    else i++;
	}
	//alert ('str=['+str+']');
	return(str);
    }

    function getKeywordHelp00(kw) {
	var i,n,ll,str,help;
//	help='---help---['+kw+']---';
	help='';
	if (kw=='DECAY-MON')	return('Standard decay data');
	if (kw=='MONITOR')	return('Standard');
	if (kw=='EN-SEC')	return('Secondary energy');
	if (kw=='INC-SOURCE')	return('Incident particle source');
	if (kw=='INC-SPECT')	return('Incident spectrum');
	if (kw=='HISTORY')	return('History of this ENTRY in the database');
	return(help);
    }
    function getKeywordHelp(kw) {
	var i,n,ll,str,help;
//	help='---help---['+kw+']---';
	help='';
	for (i=0; i<kwhlp.length; i++) {
	    if (kw==kwhlp[i].code) return kwhlp[i].help;
	}
	return(help);
    }


    function akwlink(kw)
    {
	var str,help;
	help=getKeywordHelp(kw);
	str='---BIB Keyword--- \n';
	str=str+'['+kw+']\n';
	if (help!='') {
	    str=str+''+help;
	}
	alert(str);
    }

    function myencodeURI(str0) {
	var str=str0;
//	str=encodeURI(str0);
//	str=encodeURIComponent(str0);
//	str=str0.replace(/+/g,'%2B');
	str=str0.replace(/ /g,'%20');
	return str;
    }

    function outLinkToEntry(server,accnum,UpdateDateTxt)
    {
	var str,link,str1;
//	alert('host=['+window.location.hostname+']\n'+'server='+server);
//	if (server=='localhost')
	server=window.location.hostname;
	link="http://"+server+"/EXFOR/"+accnum;
	document.writeln("<div class=x4top>");
	link="http://"+server+"/EXFOR/"+accnum;
	document.writeln("<div class=x4top1>");
	document.writeln("EXFOR data: ");
	document.writeln("<a href="+link+">");
	document.writeln(""+link);
	document.writeln("</a>");
	document.writeln("</div>");
	document.writeln("Data retrieved from the EXFOR database version of "+UpdateDateTxt+".");
	document.writeln("</div>");
    }

    function outLinkToAuthor(link,author)
    {
	var str;
	link=myencodeURI(link);
	document.writeln("<a href="+link+">");
	document.writeln(""+author);
	document.writeln("</a>");
	document.writeln("<br>");
    }

    function outLinkToEntry00(server,accnum,UpdateDateTxt)
    {
	var str,link;
	link="http://"+server+"/EXFOR/"+accnum;
	document.writeln("<div class=x4top>");
	link="http://"+server+"/EXFOR/"+accnum;
	document.writeln("#<br>");
	document.writeln("#EXFOR data: ");
	document.writeln("<a href="+link+">");
	document.writeln(""+link);
	document.writeln("</a>");
	document.writeln("<br>");
	document.writeln("#<br>");
	document.writeln("#Data retrieved from the EXFOR database (version of "+UpdateDateTxt+")");
	document.writeln("</div>");
    }



    function begKwCode(last,pointer,iinum) {
    }
    function endKwCode() {
    }
    function begCommon0() {
    }
    function outX4Code2(code,shortHelp) {
//??09	document.write('<div>');
	if (code.charAt(0)=='+')
	document.write('           <tt class=intr>#'+code+shortHelp+'</tt>');
	else
	document.write('           <tt class=intr>#<tt class=x4code>'+code+'</tt> '+shortHelp+'</tt>');
//??09	document.write('</div>');
	document.writeln('');
    }

//http://www.nndc.bnl.gov/nudat2/getdataset.jsp?nucleus=157HO&unc=nds
    function outX4ReacProduct(zz,sym,aa,meta) {
	var str,url,str1,meta1;
	var shortHelp='';
	str1=''+zz+'-'+sym+'-'+aa;
	meta1=meta;
//	if (meta!='') str1+='-'+meta1;
	url=href0+aa+sym+href1;
	str='# Product: ';
	str=str+'<a href="'+url+'"';
	str=str+' title="See it in nuclear structure database..." ';
	str=str+' target="_blank" ';
	str=str+' >';
	str=str+'['+str1+']';
	str=str+'</a>';
	document.write('           <tt class=intr>'+str+' '+shortHelp+'</tt>');
	document.writeln('');
    }

//http://www.nndc.bnl.gov/nudat2/decaysearchdirect.jsp?nuc=131XE&unc=nds
    function outX4DecayData(zz,sym,aa,meta,shortHelp) {
	var str,url,str1,meta1;
//	var shortHelp='';
	str1=''+zz+'-'+sym+'-'+aa;
	meta1=meta;
//	if (meta!='') str1+='-'+meta1;
	url=hrefDataDecay0+aa+sym+hrefDataDecay1;
	str='# Decay-data:';
	str=str+'<a href="'+url+'"';
	str=str+' title="See it in nuclear structure database..." ';
	str=str+' target="_blank" ';
	str=str+' >';
	str=str+'['+str1+']';
	str=str+'</a>';
//	document.write('           <tt class=intr>'+str+' '+shortHelp+'</tt>');
	document.write('           <tt class=intr>'+str+' <tt class=x4code>'+shortHelp+'</tt></tt>');
	document.writeln('');
    }

    function begKW_Data(code,iCol,iRaw,iw,accnum,shortHelp,open,last) {
	var text='';
	text+=code;
//	text=text+' '+iCol+' x '+iRaw+' x 12';
	text=text+' '+iCol+' '+iRaw+' '+iw;
	document.writeln(text);
    }
    function begLegend(iCol,iRow,iWidth) {
//	document.write('<tt class=intr>                      #Legend: '+iCol+' x '+iRow+' x '+iWidth+' : data columns * lines * column width'+'</tt>');
//	document.write('<div style="padding-left:65pt;">');
//	document.write('<div style="padding-left:60pt;padding-bottom:8pt;">');
	document.write('<div style="padding-left:60pt;">');
	document.write('<tt class=intr>#Legend: '+iCol+' x '+iRow+' x '+iWidth
	+' : data columns &times; lines &times; column width'+'</tt>');
	document.write('<table border=1 cellpadding=2 cellspacing=0 class="x4legend intr" style="background-color:#e8ffff;">');
    }
    function endLegend(flagCommon,dataid,colorMonotData,showCopy2csv) {
	var str1='DATA';
	if (flagCommon) str1='COMMON';
	document.write('</table>');

	if (!flagCommon)
	if (colorMonotData)
	{
/*	    document.write('<div>'
		+'<span class=intr>#Comparing to previous data value:</span>'
		+' <span class=monotEQ style="color:black;"> equal </span>'
		+' <span class=monotLT style="color:black;"> descending </span>'
		+'</div>'
		);
*/
/*	    document.write('<div>'
		+'<span class=intr>#Comparing data value a<sub>n</sub> to previous point a<sub>n-1</sub>:</span>'
		+' <span class=monotEQ style="color:black;"> a<sub>n</sub> </span> - equal;'
		+' <span class=monotLT style="color:black;"> a<sub>n</sub> </span> - decreasing'
		+'</div>'
		);
*/
	    document.write('<div>'
		+'<span class=intr>#Comparing data value a[n][i] with the previous point a[n][i-1]:</span>'
//		+' <span class=monotEQ style="color:black;">a[i]</span><span class=intr>-equal;</span>'
//		+' <span class=monotLT style="color:black;">a[i]</span><span class=intr>-decreasing</span>'
		+' <span class=monotEQ style="color:black;"> a </span><span class=intr>- equal;</span>'
		+' <span class=monotLT style="color:black;"> a </span><span class=intr>- decreasing</span>'
		+'</div>'
		);
	}

	if (showCopy2csv) {
	    document.write('<div class=intr>'
//	+'#Commands: '
	+'#Operations: '
		+'<a href="#"'
		+' onclick="javascript:savedata(\''+dataid+'\'); return false;" '
		+' title="Save '+str1+' values to Download-area as CSV"'
		+'>[save]</a> '+str1+' as CSV'
	+';&nbsp;'
		+'<a href="#"'
		+' onclick="javascript:copydata(\''+dataid+'\'); return false;" '
		+' title="Copy '+str1+' values to clipboard as CSV"'
		+'>[copy]</a> CSV to clipboard'
		+'</div>'
		);
	}

	document.writeln('<span class=intr>#/Legend</span>');

	document.write('</div>');
//	document.writeln('<span class=intr>                      #/Legend</span>');
    }
    function copydata(dataid) {
	var text=dataid;
	var xx=document.getElementById(dataid);
	if (!xx) return;
	var span=xx.children[0];
	text=span.innerHTML;
	span=xx.children[1];
	text+='\n'+span.innerHTML;
	text=dataDelSpan(text);
	try {
	    navigator.clipboard.writeText(text);
	    alert('Copied to clipboard OK.\nID: '+dataid);
//	    console.log('Copied to clipboard:\n'+text);
//	    console.log('Copied to clipboard:[\n'+text+'\n]');
//	    console.log('Copied to clipboard: OK.');
	} catch (e) {
	    console.log('Error: Copy to clipboard: '+e);
	}
    }
    function dataDelSpan(txt0) {
	var text='';
	var arr1=[];
	var arr0=txt0.split('\n');
	var ii,str,ind0,ind1;
	for (ii=0; ii<arr0.length; ii++) {
	    str=arr0[ii];
	    for (;;) {
		ind0=str.indexOf('<');	if (ind0<0) break;
		ind1=str.indexOf('>');	if (ind1<ind0) break;
		str=str.substring(0,ind0)+str.substring(ind1+1);
	    }
	    arr1.push(str);
	}
	text=arr1.join('\n');
	return text;
    }
    function savedata(dataid) {
	var text=dataid;
	var filename=dataid+'.csv';
	var xx=document.getElementById(dataid);
	if (!xx) return;
	var span=xx.children[0];
	text=span.innerHTML;
	span=xx.children[1];
	text+='\n'+span.innerHTML;
	text=dataDelSpan(text);
	downloadCSV(text,filename);
	console.log('Saved to: '+filename);
    }
    function downloadCSV(text,filename) {
	var element=document.createElement('a');
	element.setAttribute('href',
	'data:text/csv;charset=utf-8,'+encodeURIComponent(text)
	);
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
    }


var headerHelpImagesDir='../x4js/x4ppimg/';
    function outLegendLine(header,pointer,help,ucode,uhelp) {
	var headerOut=header;
	var ll=header.length;
	document.writeln('<tr>');
//	outHdr(header,pointer);

//	document.writeln('<td class=x4legend>#<span class=x4code>'+header+'</span></td>');
	if (ll>3) if (header.indexOf('-CM')==ll-3)
	headerOut='<a href="'+headerHelpImagesDir+'header-CM.png" title="Centre of Mass System" target="_blank">'+header+'</a>';
	document.writeln('<td class=x4legend>#<span class=x4code>'+headerOut+'</span></td>');

	document.writeln('<td class=x4legend><span class=x4ptr>'+pointer+'</span></td>');
	document.writeln('<td class=x4legend><span class=x4hlp>'+help+'</span></td>');
	document.writeln('<td class=x4legend><span class=x4code>'+ucode+'</span></td>');
	document.writeln('<td class=x4legend><span class=x4hlp>'+uhelp+'</span></td>');
	document.writeln('</tr>');
    }
    function begReactionCode(reacode,hlp,last,pointer) {
	var strPointer='';
//	outX4Code2(reacode,'');
	if (pointer)
	if (pointer!='')
	if (pointer!=' ')
	{
	strPointer='<span class="x4ptr">'+pointer+'</span> ';
	}
	document.write('           <tt class=intr># '+strPointer+reacode+'  '+hlp+'</tt>');
	document.writeln('');
    }
    function endReactionCode() {
    }
    function outX4Code1(code) {
//	outX4Code2(code,'');
    }
