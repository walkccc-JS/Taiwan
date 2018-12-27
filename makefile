run:
	npm run build
	rsync -r build/ dist
	git add .
	git commit -m 'update'
	git push