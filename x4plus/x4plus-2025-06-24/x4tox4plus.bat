@	cls
@echo   +-----------------------------------------------------+
@echo   I              IAEA Nuclear Data Services             I
@echo   I          Tools for Compilers and Evaluators         I
@echo   I         by Viktor Zerkin, v.zerkin@gmail.com        I
@echo   +-----------------------------------------------------+
@echo.
@echo     Translation EXFOR to X4Plus, ver-2025.06.29
@echo.
@if .%1==. (
@    echo     Please identify input EXFOR file
@    echo     Example:  C:\mydir^>x4tox4plus.bat a1.x4
@    echo               Resulting file a1.x4.htm
@    echo.
@    pause
@    exit
)

     set nowdir=%~dp0
     echo %nowdir%
     cd %nowdir%
@rem jre\bin\java -Xmx400M -cp x4tool.jar;%classpath%; x4read2x4interp %1 %2
     set path=%nowdir%\jre\bin;%path%
     java -Xmx400M -cp x4tool.jar x4read2x4interp %1 %2

@rem start %2

@rem pause

