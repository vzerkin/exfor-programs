#!/bin/bash

# Author:  Viktor Zerkin <v.zerkin@gmail.com>
# Created: December 2, 2025
# License: MIT

outWelcome() {
    cat <<-EOF
	   +------------------------------------------+
	   |   Set modification time of EXFOR files   |
	   | from the latest update date from Entries |
	   +------------------------------------------+
	   | Program: setdate2exfor.sh, v.2026-02-10  |
	   |    /by V.Zerkin, Vienna, 2025-2026/      |
	   +------------------------------------------+
	EOF
}
outPlatform() {
    cat <<-EOF
	   Platform: `uname -s -m -r`
	   Computer: `uname -n`
	   Shell:    `bash --version|head -n 1`
	   Bash-ver: $BASH_VERSION
	   Script:   $0
	   Now Dir:  `pwd`
	EOF
}

outHelp() {
	cat <<-EOF
	
	--------------------Help--------------------
	Run:  $ [bash] [scriptdir]setdate2exfor.sh [{option|file}]
	Options:
	  -e        show ENTRY
	  -c        show command setting new time
	  -o        show old timestamp of EXFOR file
	  -kw:<txt> keyword <txt> to use instead of ENTRY
	  -t:<dt>   preset date and/or time [YYYY-DD-MM][:][hh:mm:ss]
	Files:
	  <file>    EXFOR file or files
	Examples:
	   $ ./setdate2exfor.sh
	   $ bash setdate2exfor.sh
	   $ setdate2exfor.sh entry/*/*.txt
	   $ ~/bin/setdate2exfor.sh file1.x4 file2.x4
	   $ setdate2exfor.sh *.x4 -co -t:15:30:45
	   $ setdate2exfor.sh [ORF]*.x4 -ceo -kw:SUBENT
	   $ setdate2exfor.sh trans.f102 -ceo -kw:TRANS -t:13:05:49
	   $ setdate2exfor.sh prelim.c253 -ceo -kw:TRANS -t:17:04:51
	   $ setdate2exfor.sh G:\\backup\\EXFOR-2024-09-02.bck -ceo -kw:REQUEST -t:23:48:14
	EOF
}

outWelcome
if [ "$1" = ""       ] ; then outHelp; exit; fi
if [ "$1" = "--help" ] ; then outHelp; exit; fi
if [ "$1" = "-help"  ] ; then outHelp; exit; fi
if [ "$1" = "-h"     ] ; then outHelp; exit; fi
outPlatform

showEntry=0
showCmd=0
showOld=0
kw="ENTRY"
setTim="1200.00" #hhmm.ss
extDat=""
dir00=""

myos=`uname -s`
getTimestampOfFile() {
    local t=0
    if [ "$myos" = "Darwin" ] ; then
	t="`stat -l -t '%F %T %z' "$1"|awk '{ print $6$7 }'`"
    else
	t="`ls -l --time-style=full-iso "$1"|awk '{ print $6$7 }'|cut -c 1-18`"
    fi
    t="${t//-/}"; t="${t// /}"; t="${t//:/}"
    eval $2=$t
}
itime2str() {
    local s="$1"
    s="${s:0:4}-${s:4:2}-${s:6:2}T${s:8:2}:${s:10:2}:${s:12:2}"
    eval $2=$s
}


declare -a filenames
i=1; nf=0; txfiles=""
for arg in "$@" ; do
#    echo "arg$i: [$arg]"
    i=$(($i + 1))
    if [ -f "$arg" ]; then
	filenames[$nf]="$arg"
#	echo "	$nf-file: [$arg]"
	nf=$(($nf + 1))
	if [ $nf -eq 1 ]; then
	    DR=$(dirname "${arg}")
	    txfiles=" dir=$DR/"
	    dir00="$DR"
	fi
	if [ $nf -lt 4 ]; then
	    nam=${arg##*/}
	    txfiles="$txfiles $nam"
	else
	    if [ $nf -eq 4 ]; then txfiles="$txfiles ..."; fi
	fi
	continue
    fi
    if [ "${arg:0:4}" = "-kw:" ]; then
	kw="${arg:4}"
#	echo "---keyword:[$kw]"
	continue
    fi
    if [ "${arg:0:3}" = "-t:" ]; then
	t="${arg:3}"; t="${t//[^0-9]/}"; ll=${#t}
#	echo "---t:[$t] ll=$ll"
	if [ $ll -eq 6 ]; then
	    setTim="${t:0:2}${t:2:2}.${t:4:2}"
#	    echo "---preset-time:[$setTim]"
	fi
	if [ $ll -eq 8 ]; then
	    extDat="${t}"
#	    echo "---preset-date:[$extDat]"
	fi
	if [ $ll -eq 14 ]; then
	    extDat="${t:0:8}"
	    t="${t:8}"
	    setTim="${t:0:2}${t:2:2}.${t:4:2}"
#	    echo "---preset-date:[$extDat]"
#	    echo "---preset-time:[$setTim]"
	fi
	continue
    fi
    if [ "${arg:0:1}" = "-" ]; then
	if [[ $arg =~ [e] ]]; then showEntry=1; fi
	if [[ $arg =~ [c] ]]; then showCmd=1;   fi
	if [[ $arg =~ [o] ]]; then showOld=1;   fi
    fi
done
#echo "---Total input files: ${#filenames[@]}"

if [ ${#filenames[@]} -eq 0 ]; then
    echo "---No input files."
    echo "   For help run:"
    echo "       $ $0 --help"
    exit
fi

echo "   x4Files:  #${#filenames[@]}${txfiles}"
echo "   keyword:  $kw"
echo "   setTime:  $extDat$setTim    # [YYYYMMDD]hhmm.ss"
echo "---Start:    `date +'%F,%T'`"
t00=`date +%s`
ifile=0; nEntry=0; totMax=0; totMin=0
for name in "${filenames[@]}"; do
    if [ -f "$name" ]; then
	ifile=$(($ifile+1))
	nam="${name//\\/\/}"
	nam=${nam##*/}
#	printf "%5d) %s \r" $ifile ${name}
#	echo -en "#$ifile ${name}\r"
#	echo "#$ifile name:[${name}] nam=[$nam]"
	ient=0
	mindat=0
	maxdat=0

	if [ "${extDat}" != "" ]; then
	    maxdat=$extDat; mindat=$extDat
	    totMax=$extDat; totMin=$extDat
	    ient=`cat "$name"|grep "^ENTRY"|wc -l`
	    nEntry=$(($nEntry+$ient))
	    echo -en "#$ifile) file=$nam #Entry=$ient preset-date:[$extDat]\r"
	else
	    IFS='\n' #; IFS=$'\n'
#	    strings=$(grep "^ENTRY" "$name")
	    strings=$(grep "^$kw" "$name")
#	    echo "-----strings:[$strings]"
	    if [ "${strings}" = "" ]; then
		echo ""
		echo "---WARNING---"
		echo "There are no strings starting with [$kw] in the file: $name"
		echo ""
		continue
	    fi
	    while read -r str0; do
		ient=$(($ient+1))
		nEntry=$(($nEntry+1))
#		echo "--$ient [$str0]"
		Entry=${str0:11:11}; Entry=${Entry// /}
		dat="${str0:22:11}"; dat=${dat// /}
		if [ "${extDat}" != "" ]; then dat=$extDat; fi
		if [ ${#dat} -eq 6 ]; then dat="19$dat"; fi
#		echo "--${name}--$ient/$nEntry [$Entry] [$dat]"
		if [ ${#dat} -ne 8 ]; then
		    echo -en "\007"
		    echo "---$ifile) file=$name"
		    echo "---ERROR. ENTRY:$Entry DATE:[$dat]:L=${#dat} should contain 8 digits."
		    echo "---Process interrupted."
		    exit 1
		fi
		dat=$(($dat+0))
		if [ $dat -gt 0 ]; then
		    if [ $totMax -eq 0 ]; then totMax=$dat; totMin=$dat; fi
		    if [ $maxdat -eq 0 ]; then maxdat=$dat; mindat=$dat; fi
		    if [ $dat -gt $maxdat ]; then maxdat=$dat; fi
		    if [ $dat -lt $mindat ]; then mindat=$dat; fi
		    if [ $dat -gt $totMax ]; then totMax=$dat; fi
		    if [ $dat -lt $totMin ]; then totMin=$dat; fi
		fi
		echo -en "#$ifile)file=$nam $ient)$kw:[$Entry] date:[$dat] range:[$mindat-$maxdat]\r"
		if [ $showEntry -ne 0 ]; then
		    echo ""
		fi
	    done <<< "$strings"
	fi

#	echo "#$ifile $nam $ient [$totMin-$maxdat]"
	ln=`cat "$name"|wc -l`
	size=`ls -l "$name" | cut -d " " -f5`
	totLines=$(($totLines+$ln))
	totSize=$(($totSize+$size))
	printf "%3d %-16s [%8s-%8s]  size:%-10s #line:%-8d #entry:%-5d \x1b[0K\n" \
	$ifile "$nam" "$mindat" "$maxdat" "$size" $ln $ient
	if [ $maxdat -gt 19000000 ]; then
#	    ftime="${maxdat}1200.00" #noon=12:00:00
	    ftime="${maxdat}${setTim}" #noon=12:00:00
	    if [ $showOld -ne 0 ]; then
		newt="${ftime:0:4}-${ftime:4:2}-${ftime:6:2}T${ftime:8:2}:${ftime:10:2}:${ftime:13:2}"
		getTimestampOfFile "$name" otime
		itime2str "$otime" oldt
		echo "	#old time: ${oldt//T/ }"
		echo "	#new time: ${newt//T/ }"
	    fi
	    if [ $showCmd -ne 0 ]; then
		echo "	$ touch -t $ftime $name"
	    fi
	    touch -t "$ftime" "$name"
	fi
#tst	if [ $ifile -ge 40 ]; then break; fi
    fi
done
t11=`date +%s`; dt=$(($t11-$t00))
hhmmss=`printf "%02d:%02d:%02d" $((dt/3600)) $((dt/60%60)) $((dt%60))`
echo "---Finish:   `date +'%F,%T'`"
echo "---Program successfully completed---${hhmmss}=${dt}sec"

sizeMB=$((((totSize+1023)/1024+1023)/1024))
echo "---Summary---"
echo "   Files:   $ifile"
echo "   Size:    $totSize(~${sizeMB}M)"
echo "   Lines:   $totLines"
echo "   Entries: $nEntry"
echo "   Dates:   $totMin-$totMax"

#echo -n "Pause. Press <Enter> to continue..."; read aaa
