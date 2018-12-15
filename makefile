run:
	npm run build
	rsync -r build/ dist
	firebase deploy
	git add .
	git commit -m 'update'
	git push