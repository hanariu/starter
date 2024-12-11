package main

import (
	"log"
	"net/http"

	"starter/internal/templates"

	"github.com/a-h/templ"
)

func main() {
	http.HandleFunc("/", getHome)

	fs := http.FileServer(http.Dir("./web/static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	log.Print("Listening on :3000...")
	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		log.Fatal(err)
	}
}

func getHome(w http.ResponseWriter, r *http.Request) {
	dark := getCookieDarkModeHandler(r)
	templ.Handler(templates.Init(dark)).ServeHTTP(w, r)
}

func getCookieDarkModeHandler(r *http.Request) string {
	cookieDarkMode, err := r.Cookie("darkMode_on")
	if err != nil {
		return ""
	}
	return cookieDarkMode.Value
}
