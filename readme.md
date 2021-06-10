# Projektarbeit CAS Block 4  
Autoren: Johannes Schmitz, Richard Wingerath, Marco Thyssen

## Starten des Programms

npm run start

## Aufruf

Browser öffnen und http://localhost:3001 aufrufen.  

## Anmeldung

Administrator-Zugang: Benutzername: admin, Kennwort: admin
Benutzer-Zugang: Benutzername: default, Kennwort: default

## Bekannte Fehler

- Die Controller-Klassen trennen teilweise nicht sauber nach Administratoren und normalen Benutzern,
  so dass normnale Benutzer Funktionen ausführen können, die nur für Administratoren erlaubt sind.  
- Die Funktion del_sugg in user_d.js löscht nicht den Buchungsvorschlag, sondern bringt die user.json
  durcheinander. Ursache noch unklar.