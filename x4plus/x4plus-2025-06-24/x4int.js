var href0='http://www.nndc.bnl.gov/nudat3/getdataset.jsp?nucleus=';
var href1='&unc=nds';
var hrefDataDecay0='http://www.nndc.bnl.gov/nudat3/decaysearchdirect.jsp?nuc=';
var hrefDataDecay1='&unc=nds';

//to link to the IAEA-Livechart, uncomment following 2 lines
//href0='http://nds.iaea.org/relnsd/NdsEnsdf/nuclide.jsp?NUCID='
//hrefDataDecay0='http://nds.iaea.org/relnsd/NdsEnsdf/nuclide.jsp?NUCID='


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


    function outX4hdr(kw0,pointer)
    {
	var kw,help;
//	document.write(kw0);
	kw=delSpaces(kw0);
	help=getHeaderHelp(kw);
	if (help=='') {
	    document.write('<tt ');
	    document.write(' class="hdr0" ');
	    document.write('>');
	    document.write(kw0);
	    document.write(pointer);
	    document.write('</tt>');
	    return;
	}
	document.writeln('<a href="javascript:ahdlink(\''+kw+'\')" ');
	document.writeln(' class="hdr" ');
	document.writeln(' title="'+help+'" ');
	document.write('>');
	document.write(kw0);
	document.write(pointer);
	document.write('</a>');
    }
    function getHeaderHelp(kw) {
	var i,n,ll,str,help;
//	help='---help---['+kw+']---';
	help='';
	for (i=0; i<hdrhlp.length; i++) {
	    if (kw==hdrhlp[i].code) return hdrhlp[i].help;
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

    function ahdlink(kw)
    {
	var str,help;
	help=getHeaderHelp(kw);
	str='---DATA Header--- \n';
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
	document.write('<tt class=intr>#Legend: '+iCol+' x '+iRow+' x '+iWidth+' : data columns * lines * column width'+'</tt>');
	document.write('<table border=1 cellpadding=2 cellspacing=0 class="x4legend intr" style="background-color:#e8ffff;">');
    }
    function endLegend() {
	document.write('</table>');
	document.writeln('<span class=intr>#/Legend</span>');
	document.write('</div>');
//	document.writeln('<span class=intr>                      #/Legend</span>');
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
