run: @build
	@./build/starter

build:
	@go build -o ./tmp/starter ./main.go

css:
	npx tailwindcss -i ./web/app/assets/tailwind.css -o ./web/app/assets/output.css --watch --minify 

ts:
	npm run watch

templ:
	templ generate --watch --proxy="http://localhost:3000" --cmd="go run ."