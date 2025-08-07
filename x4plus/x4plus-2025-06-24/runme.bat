@echo Example with REL-REF: (R,A1007001,H.Liskien+,J,ND/A,11,569,1973)
call x4tox4plus.bat a1.x4

@echo Example with DECAY-DATA with FLAG: ((1.)35-BR-84-G,31.8MIN,DG,881.5,0.42)
call x4tox4plus.bat 10828.x4

@echo Example with new coding of STATUS: (TABLE,,H.Sauvageon+,J,PR/C,24,2667,1981)
call x4tox4plus.bat O0050002.x4

@echo Example with MONIT-REF having SUBENT with REFERENCE: (10709002,D.R.Nethaway,J,JIN,40,1285,1978)
@echo and REL-REF:(I,,C.M.Logan+,J,JNM,108-109,29,1982)
call x4tox4plus.bat 12977002.x4

@echo Example with EN<0 
call x4tox4plus.bat 14688002.x4
